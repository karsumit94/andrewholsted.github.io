---
layout: "post"
title: "Goodbye Jekyll"
date: 2013-08-10 09:04 UTC
tags: "Middleman, Jekyll "
meta-description: "Switching from Jekyll to Middleman"
published: false
---

First, there was WordPress. Then, there was Jekyll. Now... there is Middleman! 

Maybe that was a little dramatic. Today, I switched my blog from Jekyll to Middleman. Why?

Because it's awesome. It is, but the primary reason is because I can use Ruby syntax in Middleman, and I've recently been working on a Ruby on Rails app. About a week ago, I was in the throws of one of my recent projects, and was running into the web developer's equivalent of writers block. Is there a name for that? I decided to take a short break and try my hand a couple of other things. I wrote a [Minesweeper](http://fajitanachos.com/Minesweeper) clone in JQuery (Blog post forthcoming). I also played around with a few APIs and created a rough mockup for the [Hacker News Kansai](http://hnk.herokuapp.com) redesign.  While I was talking to one of the HN Kansai organizers he suggested I have a look at Middleman. Thank you [Sacha](http://sachagreif.com/).

Middleman is a static site generator just like Jekyll. With Jekyll being the 'default' static site generator on GitHub, I wasn't sure if I could make GitHub and Middleman play nice together. Luckily, there's a nice deployment extension for Middleman, which combined with a little git branch rearranging, works just fine. So what follows is a thoroughly incomplete and off the top of my head rendition of how to turn a Jekyll site to a Middleman site, and host it on GitHub pages. It also helps if you have a passing familiarity with Jekyll and/or Ruby. Please enjoy. 

Wait, first, make an exact copy of your current Jekyll site and put it somewhere safe. You know, just in case... 

Let's set up a new project directory and get Middleman installed.

```bash
$ mkdir FajitaNachos
$ gem install middleman
$ gem install middleman-blog
$ middleman init FajitaNachos --template=blog
```

And have a look at our new diggs. 

```bash
$ cd FajitaNachos
$ sublime .
```

You should have a source/ directory which is where we will be doing the majority of our work. Middleman takes whatever you have in your source/ directory, runs it through the generator, and outputs a static site into the build/ directory. The 'sublime' command is an alias I have set up for Sublime Text 2. I think most people use 'subl' but I prefer the full name. Open your config.rb file and have a look at the options inside the active :blog block. Here is what mine looks like. Yours will probably differ. 

```ruby
activate :blog do |blog|
  #blog.prefix = "posts"
  blog.permalink = ":title.html"
  blog.sources = "/posts/:year-:month-:day-:title.html"
  # blog.taglink = "tags/:tag.html"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = ":year.html"
  # blog.month_link = ":year/:month.html"
  # blog.day_link = ":year/:month/:day.html"
  # blog.default_extension = ".markdown"
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/:num"
end

activate :directory_indexes
````

'Activate :directory_indexes' takes all of your posts and puts them into their own directory with an index.html file. Basically you end up with pretty URLs like [http://fajitanachos.com/Friday-Night/](http://fajitanachos.com/Friday-Night/). The default Middleman structure is to keep all of your posts in the root directory of your site. That seemed a little messy to me, and luckily it is easy to customize. In the snippet above you can see 

```ruby
blog.sources = "/posts/whatever-format-you-want-here"
```

This tells Middleman that all of my posts reside in the /posts/ directory. Set it and forget it. 

At this point, I would go ahead and copy all of your Jekyll posts into your new posts/ directory. Also, copy your _layouts into a new /layouts directory and your css, javascript, and image files into their respective directories. Depending on what your directory names are, you may need to tweak the settings in your new config.rb. Look for these lines

```ruby
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'images'
```

And set those to the correct path names. Middleman has an asset pipeline that you should probably take advantage of. This post is long enough without diving into that, but if you are familiar with Ruby on Rails, then it wont' be a problem. 

Layouts
--------

Layouts work basically the same way, although nested layouts are a little different. First, you'll want to rename your layout.html.erb file to layout.erb. And wherever you had

```
{{ content }}
```

You will want to replace with 

```
<%= yield %>
``` 

Nested layouts are a little different. For example, I have a post.erb layout for all most posts. It looks like this

```erb
<% wrap_layout :layout do %>
  <div id="post-wrap">
    <div id ="post-header">
      <h1 id ="site-title"> <a href ="/">FajitaNachos</a></h1>
    </div>
    <div id ="post-container">
      <article>
          <h1 id ="post-title"><%= current_page.title %></h1>
          <div id ="post-content">
             <%= yield %>
          </div>
          <div id ="post-nav"> 
            <% if current_page.previous_article %>
              <div id="previous-post">
                <%= link_to current_page.previous_article.title, current_page.previous_article %> 
              </div> 
            <% end%> 
            <% if current_page.next_article %>
              <div id="next-post"> 
                <%= link_to current_page.next_article.title, current_page.next_article %> 
              </div> 
            <% end%>
        </div>
      </article>
    </div>
  </div>
<% end %>
```


Front Matter
-------------

Both Jekyll and Middleman use markdown for your blog posts, and yaml front matter to handle things like titles and tags. You shouldn't have to do anything here. Your posts should work right out of the box assuming you've referenced your image directories properly.


Removing Jekyll specific code
------------------------------

As I mentioned earlier, Middleman uses a Ruby syntax so you can do all sorts of nifty things like 

```erb
<%= link_to 'Fajita Nachos', 'http://fajitanachos.com' %>

<% link_to 'http://fajitanachos.com' do %>
  <%= image_tag 'my_super_awesome_logo.png' %>
<% end %>
```

However, that also means that your previous Jekyll syntax won't work. Things like 

```
{% for post in site.posts %}
  <li class = "post-item">
      <a href="{{ post.url }}">{{ post.title }}</a>
    <span class = "post-date">{{ post.date | date: "%B %e, %Y" }}</span> 
  </li>
  {% endfor %}
```

Will need to be replaced with 

```erb
<% blog.articles.each do |post| %>
  <li class ="post-item">
    <%= link_to(post.title, post.url)%>
    <span class ="post-date"><%= post.date.strftime('%b %e, %Y') %></span>
</li>
<% end %>
```

Also worth mentioning is that common site references in Jekyll are different in Middleman, for example

```html
{{site.title}} 
```

will no longer work. Correcting all the syntax differences is what took me the longest. 

Testing Locally
---------------

After you have removed the Jekyll specific syntax, let's fire up a local sever to see how much stuff we have broken. 

```bash
$ middleman
```
Now you should have local server up and running at localhost:4567. Have a look around and fix whatever is broken. If you image files aren't showing up, try running

```bash
$ middleman build
```

This will take everything from source/ and move it to /build which is were your static site lives. This is what we will be depolying to GitHub Pages later. 

Generating a Site Map
---------------------

I wanted to generate a site map for my blog posts, but only based on the posts titles. Here's what I came up with. In /source/sitemap.xml.erb add these lines

```ruby
<% pages = page_articles %>
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<% pages.each do |p| %>
  <url>
    <loc>http://yourblog.com<%=p.url%>index.html</loc>
    <priority>0.7</priority>
  </url>
<% end %>
</urlset>
```

Deploying
---------

Now we need to push this bad boy up to our GitHub Pages repo. This is assuming you have your repo at your-username.github.io. For example, mine is fajitanachos.github.io. There's a nice little gem called [middleman-deploy][http://rubygems.org/gems/middleman-deploy] that we can use to smoothly deploy out app. 

Add it to your Gemfile

```
gem "middleman-deploy"
```

Run 

```bash
$ bundle install
```

Then open your config.rb and add these lines

```rb
activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true # default: false
  deploy.branch = "master"
end
```

Be careful here. If you push as is, it will overwrite everything in your master branch. Trust me, I'm speaking from experience.  I spent a couple hours today getting all of this to play nice together so here is what I did. Right now you should have copied everything from your Jekyll install, into Middleman. Your .git file should be in the root of your middle man install along with your /bundle and /source directories. It should look something like this

```
.git
.gitignore
build/
source/
config.rb
Gemfile
Gemfile.lock
README.md
```

Now we can add all of our new changes to our git working tree

```bash
$ git add -A
$ git commit -m "Switching to Middleman"
```

Now we have all of our changes committed on our master branch. The problem is that our little deployment friend is going to push to master and overwrite all these changes. With GitHub Pages, for personal pages, GitHub only reads what's in the master branch. For project pages, you can push to a gh-pages branch and be fine. But this won't work for our personal repo. So, what we need to do is copy our master branch into a new branch. I chose to call it source. 

```
$ git branch source master
```

This will move your master branch into a new source branch. So let's push it up to GitHub. 

```bash
$ git checkout source
$ git push origin source
```

Now that our old git history is safely stored in the source branch, we can deploy our middleman site to our master branch.

```bash
$ middleman deploy
```

You should see something like this 

```bash
 run  middleman build from "."
 
 //lots of stuff here

 ## Deploying via git to remote="origin" and branch="master"

```

Now go check your GitHub repo and hope everything isn't broken. 



