---
layout: "post"
title: "Goodbye Jekyll"
date: 2013-08-10 09:04 UTC
tags: "Middleman, Jekyll "
meta-description: "Switching from Jekyll to Middleman"
---

<center>*This post is about moving my blog from Jekyll to Middleman.*</center>

About a week ago, I was in the throws of one of my recent projects. I was running into the web developer's equivalent of writer's block. Is there a name for that? I decided to take a short break and try my hand at a couple of other things. I wrote a [Minesweeper](http://fajitanachos.com/minesweeper) clone in JQuery (blog post forthcoming), and my local Hacker News meetup had talked about redesigning their site so I played around with a few APIs and came up with [this](http://hnksansai.org).  While I was talking to one of the organizers, he suggested that I have a look at Middleman. Thank you [Sacha](http://sachagreif.com/)!

[Middleman](http://middlemanapp.com) is a static site generator just like Jekyll. With Jekyll being the default static site generator for GitHub Pages, I wasn't sure if I could make GitHub and Middleman play nicely together. Luckily, there's a nice deployment extension for Middleman which, combined with a little git branch rearranging, works just fine. So what follows is a thoroughly incomplete and off the top of my head rendition of how to turn a Jekyll site into a Middleman site, and keep it hosted on GitHub pages. Please enjoy. 

First, make a copy of your current Jekyll site and put it somewhere safe. You know, just in case... 

Then set up a new project directory and install Middleman.

```bash
$ mkdir FajitaNachos
$ gem install middleman
$ gem install middleman-blog
$ middleman init FajitaNachos --template=blog
```

Let's have a look at our new diggs. 

```bash
$ cd FajitaNachos
$ sublime .
```

You should have a source/ directory, which is where we will be doing the majority of our work. Middleman takes whatever you have in your source/ directory, runs it through the generator, and spits out a static site into the /build directory. The 'sublime' command is an alias I have set up for Sublime Text 2. I think most people use 'subl' but I prefer the full name. Open your config.rb file and have a look at the options inside the activate :blog block. Here is what mine looks like (Yours will probably differ.) 

```ruby
#config.rb

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

This line

```
Activate :directory_indexes 
```

takes all of your posts and puts them into their own directory with an index.html file. Basically you end up with pretty URLs like [http://fajitanachos.com/Friday-Night/](http://fajitanachos.com/Friday-Night/). If you want to use it, just be sure it's below the activate :blog block. The default Middleman structure is to keep all of your posts in the root directory of your site. That seemed a little messy to me, and luckily it is easy to customize. In the snippet above you can see 

```ruby
blog.sources = "/posts/whatever-format-you-want-here"
```

This tells Middleman that all of my posts reside in the /posts/ directory. Set it and forget it. 

At this point, I would go ahead and copy all of your Jekyll posts into your new posts/ directory. Also, copy your _layouts into a new layouts/ directory. In fact, go ahead and move everything from your Jekyll site, into your new Middleman project. Depending on what your directory names are, you may need to tweak the settings in your new config.rb. Look for these lines

```ruby
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'images'
```

And set those to the correct path names. Middleman has an asset pipeline that you should probably take advantage of. This post is long enough without diving into that, but if you are familiar with Ruby on Rails, then it shouldn't be a problem. 

Layouts
--------

Layouts work almost the same way they did in Jekyll, although nested layouts are a little different. First, you'll want to rename your layout.html.erb file to layout.erb. And wherever you had

```
{{ content }}
```

You will want to replace with 

```
<%= yield %>
``` 

Here's an example of a nested layout, post.erb, that I use for all my posts. The first line is the important part, with the regular yield statment coming where you wanted the content to be. I declare the layout in each post's yaml front matter, which then renders the layout.erb, with this post.erb layout inside of it, and finally the post content where the yield block is below. 

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


Markdown and Front Matter
-------------

Both Jekyll and Middleman use markdown for your blog posts, and yaml front matter to handle things like titles and tags. You shouldn't have to do anything here. Your posts should work right out of the box assuming you've referenced your image directories properly.


Removing Jekyll Specific Code
------------------------------

As I mentioned earlier, Middleman uses Ruby syntax so you can do all sorts of nifty things like 

```erb
<%= link_to 'Fajita Nachos', 'http://fajitanachos.com' %>

<% link_to 'http://fajitanachos.com' do %>
  <%= image_tag 'my_super_awesome_logo.png' %>
<% end %>
```

However, that also means that your previous Jekyll syntax won't work. Things like 

```html
{% for post in site.posts %}
  <li class ="post-item">
      <a href="{{ post.url }}">{{ post.title }}</a>
    <span class ="post-date">{{ post.date | date: "%B %e, %Y" }}</span> 
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

will no longer work. Correcting all the syntax differences took a fair bit of time. 

Syntax Highlighting
-------------------

What's a web development blog without syntax highlighting? It's not hard to set up. I was already using Pygments with Jekyll so I decided to stick with that. Add this line to your Gemfile

```ruby
gem "middleman-syntax"
gem "redcarpet"
```
And run 

```bash
$ bundle install
```

In your config.rb file add

```ruby
#config.rb

activate :syntax
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true
```

That's it. Now you can use fenced code blocks like this

    ```ruby
       #your code here
    ```
You can manage the styling by adding a pygments.css file in your css/ directory and including it in your pages. 

Drafts
----------

I never really liked how the drafts feature worked in Jekyll. Maybe I was doing it wrong, but I had a seperate directory called _drafts/ where all my drafts resided. When I was done I would move it out of drafts and into _posts/. With Middleman, I find it much simpler to setup and maintain. In the front matter of your post, just add this line

```yaml
published: false
```

And Middleman will ignore this post whenever it builds the site. 

Testing Locally
---------------

After you have copied all your files and removed the Jekyll specific syntax, fire up a local sever to see what is broken. If it works on the first time, you're a god. 

```bash
$ middleman
```
Now you should have a local server up and running at localhost:4567.  If your image files aren't showing up, try running

```bash
$ middleman build
```

Generating a Site Map (Bonus)
---------------------

I wanted to generate a site map for my blog posts, but only based on the post's title. Here's what I came up with. In source/sitemap.xml.erb add these lines

```erb
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

Now, we need to push this bad boy up to our GitHub Pages repo. This is assuming you have your repo at yourusername.github.io. For example, mine is fajitanachos.github.io. There's a nice little gem called [middleman-deploy](http://rubygems.org/gems/middleman-deploy) that we can use to push everything to GitHub. 

Add this to your Gemfile

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

Be careful here. If you deploy as is, it will overwrite everything in your master branch. Trust me, I'm speaking from personal experience here. For me, it was important to maintain all my previous commit history. Here is what your two projects should currently look like.

Old Jekyll project

```text
.git
.gitignore
```
New Middleman project

```text
build/ 
source/ 
config.rb 
Gemfile 
Gemfile.lock 
README.md
 + any of your other old Jekyll files
```

Next, I copied everything from my new Middleman project back into my old Jekyll site (which should only have your .git and .gitignore files). You still have that backup of your Jekyll site right?  My new structure looked like this

Old Jekyll project directory

```
.git (from your Jekyll site)
.gitignore (from your Jekyll site)
build/ 
source/ 
config.rb 
Gemfile 
Gemfile.lock 
README.md
```

Then I added all of my new changes to my git working tree

```bash
$ git add -A
$ git commit -m "Switching to Middleman"
# adding and removing lots of files here
```

Now, all of my new changes are committed on my master branch and I still have the old history. However, whenever we deploy using the middleman-deploy gem, it's going to push to master and overwrite all those commits. This is bad. One solution is to move everything out of your master branch, into a seperate branch, which I chose to call 'source'.

```
$ git branch source master
```

This will move your master branch into a new source branch, and then you can check it out and push it to GitHub.

```bash
$ git checkout source
$ git push origin source
```
 For personal and organization pages, GitHub only reads what's in the master branch. Now that our old git history is safely stored in the source branch, we can deploy our Middleman site to our master branch. 

```bash
$ middleman deploy
```

You should see something like this 

```bash
 run  middleman build from "."
 
 //lots of stuff here

 ## Deploying via git to remote="origin" and branch="master"

```

One last thing. Visit your repo on GitHub. The first thing you should see on your master branch are commit messages that look something like this.

```
Automated commit at 2013-08-10 04:17:26 UTC by middleman-deploy 3.1.4
```

This is normal, and ugly. Luckily, all of our old history is still intact on the source branch. Go into your repo settings and change the default branch to be source instead of master. So when you visit the repo, the first thing you will see is all of your commits and previous history instead of having to change branches to see it. 


Conclusion
-----------

Now, you should be able to make any changes you want, in any directory of your new blog, and push it to the source branch of your repo with the proper commit messages. To deploy your blog run

```bash
$ middleman deploy 
```

and it will update the master branch and push it to GitHub. 

I know that I glossed over some things here and there, but this is what stuck with me when I was moving from Jekyll to Middleman. If you have any questions, I'll be happy to help via email. 






