---
layout: "post"
title: "Fullcalendar and Recurring Events"
meta-description: "How to set up recurring events using arshaw's fullcalendar."
tags: "Fullcalendar, PHP, MySQL"
---

I'm currently using arshaw's <a href="http://arshaw.com/fullcalendar/">fullcalendar</a> for a project I'm working on. It's a nice calendar with great documentation. However, it is up to the developers to implement their own back end for the calendar. Here's what I did using PHP and MySQL.

First, I use two MySQL tables to store the event data. One is called 'events_parent' and the other is 'events'. Each event can have only one parent event.

The events_parent table 

<table id="fc-parent-events">
    <tbody>
        <tr class="fc-table-header">
            <td>Field</td>
            <td>Type</td>
            <td>Key</td>
            <td>Default</td>
            <td>Extra</td>
        </tr>
        <tr class="first-row">
            <td>parent_id</td>
            <td>int(30)unsigned</td>
            <td>primary</td>
            <td>NULL</td>
            <td>auto_increment</td>
        </tr>
        <tr>
            <td>title</td>
            <td>varchar(120)</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>weekday</td>
            <td>int(1)</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>start_date</td>
            <td>date</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>start_time</td>
            <td>time</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>end_time</td>
            <td>time</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>repeats</td>
            <td>tinyint(1)</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>repeat_freq</td>
            <td>tinyint(1)</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
    </tbody>
</table>

The events table

<div class="code-wrap">
<table id="fc-events">
<tbody>
<tr class="fc-table-header">
<td>Field</td>
<td>Type</td>
<td>Key</td>
<td>Default</td>
<td>Extra</td>
</tr>
<tr class="first-row">
<td>event_id</td>
<td>int(30)unsigned</td>
<td>primary</td>
<td>NULL</td>
<td>auto_increment</td>
</tr>
<tr>
<td>parent_id</td>
<td>int(30)unsigned</td>
<td></td>
<td>NULL</td>
<td></td>
</tr>
<tr>
<td>start</td>
<td>datetime</td>
<td></td>
<td>NULL</td>
<td></td>
</tr>
<tr>
<td>end</td>
<td>datetime</td>
<td></td>
<td>NULL</td>
<td></td>
</tr>
<tr>
<td>title</td>
<td>varchar(120)</td>
<td></td>
<td>NULL</td>
<td></td>
</tr>
</tbody>
</table>
</div>

A brief explanation. 

**weekday** - 1 for Monday, 2 for Tuesday etc. I use 0 if the event repeats daily as the starting weekday name doesn't really matter in that case. 

**repeats** - 1 for recurring events and 0 for single events. 

**repeat_freq** - 0 for non-repeating events, 1 for daily, 7 for weekly, 14 for every other week etc. 

I think everything else is pretty self explanatory. 

Including fullcalendar is just like loading any other external js file.
    {% highlight html %}
    <script type="text/javascript" src="/path_to_your_fullcalendar_folder/fullcalendar.js"> </script>
    {% endhighlight %}

You have several options where you can pull your event data from. I chose to pass a URL to a php file where I fetch the events and return them (via JSON).

{% highlight javascript %}

    $(document).ready(function() { 
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var calendar = $('#calendar').fullCalendar({
        //configure options for the calendar
           header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
           },


           // this is where you specify where to pull the events from.

           events: "includes/json-events.php",
           editable: true,
           defaultView: 'month',
           allDayDefault: false,
           //etc etc
       });
    });

{% endhighlight %}

This is the json-events.php page

{% highlight php %}
    <?php 
        require_once '../../../config/db-config.php';

        $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname, $mysql_username, $mysql_password");
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $dbh->prepare("SELECT event_id, parent_id, title, start, end
                               FROM events");
        $stmt->;execute();
        $events = array();

        while ($row = $stmt->;fetch(PDO::FETCH_ASSOC)){
            $eventArray['id'] = $row['event_id'];
            $eventArray['parent_id'] = $row['parent_id'];
            $eventArray['title'] = stripslashes($row['title']);
            $eventArray['start'] = $row['start'];
            $eventArray['end'] = $row['end'];
            $events[] = $eventArray;
        }

        echo json_encode($events);
    ?>
{% endhighlight %}


I query the database for all the events in my events table, put them in an array, JSON encode the array, and echo it out. Fullcalendar implements "lazy fetching" where it will only pull the events that are needed for the current, previous, and next month views. The other events are loaded as needed through URL parameters. Obviously if it gets to the point where there are 10 or 20 thousand events then I'll probably need to optimize the query.

Alright, let's make some bacon. And by that I mean let's add an event to the calendar. I have a div with the display set to none. I open this div as a dialog with the event select callback. Here's the div.

{% highlight html %}
    <div id="add-event" title="Add New Event">
        <form action="" id ="add-event-form" name="add-event-form">
            <label for="title">Event Name</label>
            <input type="text" name="title" id="title"/>
            <p>
            <label for="add-date">Date</label>
            <input type="text" name="event-date" id="event-date" tabindex="-1" />
            </p>
            <p>
            <label for="add-start-time">Start Time</label>
            <input type="text" name="start-time" id="start-time" />
            </p>
            <p>
            <label for="add-end-time">End Time</label>
            <input type="text" name="end-time" id="end-time" />
            </p>
            <p>
            <label for = "repeats">repeat </label>
            <input type="checkbox" name="repeats" id="repeats" value="1"/>
            <div id = "repeat-options" >
                 Repeat every: day <input type="radio" value="1" name="repeat-freq" align="bottom">
                 week <input type="radio" value="7" name="repeat-freq" align="bottom">
                 two weeks <input type="radio" value="14" name="repeat-freq" align="bottom">
            </div>
        </form>
    </div>
{% endhighlight %}

Next, the js for the dialog

{% highlight javascript %}

    $("add-event").dialog({
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        autoResize:true,
        modal: false,
        resizable: false,
        open: function(){
            $("#title").attr("tabindex","1");
        },
        buttons: {
            "Save Event": function() {
                $.ajax({
                    type:"POST",
                    url: "includes/add-event.php",
                    data: $('#add-event-form').serialize(),
                    success: function(){
                        calendar.fullCalendar('refetchEvents');
                    }
                });
                $(this).dialog("close");
            },

            Cancel: function() {
                $(this).dialog("close");
            }
        },
    });

{% endhighlight %}

Finally, let's have a look at the add-event.php page

    {% highlight php %}
    <?php
        require_once '../../../config/db-config.php';
        $title = $_POST['title']; $start_date = $_POST['event-date'];
        $weekday = date('N', strtotime($start_date));
        $start_time = $_POST['start-time'];
        $end_time = $_POST['end-time'];
        $start = $start_date . " " . $start_time; $end = $start_date . " " . $end_time;

        if (!isset($_POST['repeats'])) {
            $repeats = 0;
            $repeat_freq = 0;
            $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
            try{
                $dbh->beginTransaction();
                $stmt = $dbh->prepare("INSERT INTO events_parent 
                    (title,start_date, start_time, end_time, weekday, repeats, repeat_freq)
                    VALUES (:title,:start_date, :start_time, :end_time, :weekday, :repeats, :repeat_freq)");

                $stmt->bindParam(':title', $title );
                $stmt->bindParam(':start_date', $start_date);
                $stmt->bindParam(':start_time', $start_time);
                $stmt->bindParam(':end_time', $end_time);
                $stmt->bindParam(':weekday', $weekday);
                $stmt->bindParam(':repeats', $repeats);
                $stmt->bindParam(':repeat_freq', $repeat_freq);
                $stmt->execute();
                $last_id = $dbh->lastInsertId();

                $stmt = $dbh->prepare("INSERT INTO events 
                    (parent_id, title, start, end)
                    VALUES (:parent_id, :title, :start, :end)");

                $stmt->bindParam(':title', $title );
                $stmt->bindParam(':start', $start);
                $stmt->bindParam(':end', $end);
                $stmt->bindParam(':parent_id', $last_id);
                $stmt->execute();

                $dbh->commit();

            }
            catch(Exception $e){
                $dbh->rollback();
            }
        }
        else {
            $repeats = $_POST['repeats'];
            $repeat_freq = $_POST['repeat-freq'];
            $until = (365/$repeat_freq);
            if ($repeat_freq == 1){
                $weekday = 0;
            }
            $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // set the error mode to excptions
            $dbh->beginTransaction();
            try{
                $stmt = $dbh->prepare("INSERT INTO events_parent 
                    (title,start_date, start_time, end_time, weekday, repeats, repeat_freq)
                    VALUES (:title, :start_date, :start_time, :end_time, :weekday, :repeats, :repeat_freq)");

                $stmt->bindParam(':title', $title );
                $stmt->bindParam(':start_date', $start_date);
                $stmt->bindParam(':start_time', $start_time);
                $stmt->bindParam(':end_time', $end_time);
                $stmt->bindParam(':weekday', $weekday);
                $stmt->bindParam(':repeats', $repeats);
                $stmt->bindParam(':repeat_freq', $repeat_freq);
                $stmt->execute();
                $last_id = $dbh->lastInsertId();

                for($x = 0; $x <$until; $x++){
                    $stmt = $dbh->prepare("INSERT INTO events 
                        (title, start, end, parent_id)
                        VALUES (:title, :start, :end, :parent_id)");
                    $stmt->bindParam(':title', $title );
                    $stmt->bindParam(':start', $start);
                    $stmt->bindParam(':end', $end);
                    $stmt->bindParam(':parent_id', $last_id);
                    $stmt->execute();
                    $start_date = strtotime($start . '+' . $repeat_freq . 'DAYS');
                    $end_date = strtotime($end . '+' . $repeat_freq . 'DAYS');
                    $start = date("Y-m-d H:i", $start_date);
                    $end = date("Y-m-d H:i";, $end_date);
                }
                $dbh->commit();
            }

            catch(Exception $e){
                $dbh->rollback();
            }
        }
        header ("location: ../");
    ?>
    {% endhighlight %}

Every time I add an event to the calendar, I insert a row into the parent_events table. After I insert the row, I grab the new parent_id using lastInsertId(). Next, I run a loop and insert a row for every occurrence of the event until the end date.This allows me to do a few things. One, I can change any single event and it won't affect any of the other events. Two, I can edit all events by using their common parent id. Three, I can still delete all occurrences of an event by deleting the relevant rows from the events table using the parent_id

There are a couple of caveats to this method. The author of fullcalendar recommends to have each repeating event share the same event_id. I did it this way initially, but decided that I didn't really like it. When you have a set of repeating events share a common event_id then you have to ask the user every time they want to change an event, if they want to change only *this* event or *all* the events. Another problem I ran into was when a user wanted to drag and drop an event to a new day/time. The user would drop the event on a new location and *all* of the events would be moved forward or backward by that amount of time (called dayDelta and minuteDelta in fullcalendar). To only move a single event I needed to assign a new event_id to that one event (not a big deal) and refetch all the events which would make them revert back to their original spots (the revert part was the big deal). It just wasn't a very smooth experience.

So, I made the choice to allow my users to only edit individual events directly from the calendar and to go to a different page if they wanted to change all occurrences of an event. I'll be the first to admit that this isn't ideal, but it is a smoother user experience than having multiple dialog windows asking if they want to change one event or all events, delete one event or all events, etc. It's not the best or most efficient way to implement recurring events. For example, my users are currently limited to only having repeating events daily, weekly, bi-weekly, and monthly. For now, it works and it works well for my needs. 

So that is the basic flow of how I add recurring events to the calendar. I won't get into editing events or deleting events in detail. Deleting an event is as simple as making an AJAX request with the parent_id and deleting the relevant row from the parent_events table. To edit an event (in my case) you are only editing one instance of an event. Simply make an AJAX request using the current event_id and update the row in your events table to the new start time and end time.

That's about it. If you have questions feel free to send me an email on the contact page and I'll do my best to help you out.