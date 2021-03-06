---
layout: "post"
title: "Quick Preview"
meta-description: "A WordPress plugin to save and preview a post using Ctrl+S (Cmd+S)"
tags: "WordPress, PHP"
---

Last week I was looking around for suggestions on how rookie devs can contribute to open source projects. I stumbled across a post that suggested, if you're using WordPress, writing WordPress plugin in lieu of contributig to an existing project. At that time I was using WordPress and it sounded like fun, so I did.  

I started thinking about things I wanted to see in my own install of WordPress.The first thing that came to mind was how I tried to hit Cmd-S every time I wanted to save a post. I use Cmd-S to save things everywhere else, but in WordPress, it opened the save file dialog instead of saving the post. Bingo. I had my idea.

Next, I did a quick search of the WordPress directory to see if something like that already existed.

Of course it did. Aptly named [Ctrl-S][1]. Damn.

At that point, I had two choices. I could search for another idea, or I could find a way to make my plugin a little different. I felt like it was a perfect starter project. It was simple, it wouldn't take too long to build, and I would be able to get a feel for the process of creating a plugin. I decided to stick with it and change it up a bit by adding a preview of the post after saving.

Here's a couple issues I ran into during the course of creating it.

1. Whenever you click the save preview button on WordPress, it refreshes the page. When I simulated the click event, the page would refresh before I could open the preview. I couldn't use a setTimeout() function either because the timeout would be reset when the page was refreshed. What I ended up doing was setting a cookie and then checking for the cookie each time the page is visited. If the cookie is set, then I open the preview and unset the cookie. If it's not, then it's just business as usual.

2. WordPress uses Tiny MCE. TinyMCE has it's own keydown function which means the keydown function I set in my plugin wasn't firing when the editor took focus. It took a little bit of time to track down why my keydown event wasn't firing and how to correct it. Essentially, you have to add the keydown event in the WordPress initialization of tinyMCE.

[Quick-Preview][2] has been active in the directory for a couple of weeks now. There are 95 downloads as of today which isn't too bad considering I haven't told anyone about it. There's one user on the support forum who is having trouble with the plugin not showing a preview at all. I've tried my best to duplicate the problem, but everything works fine for me on multiple computers in Chrome, FireFox, and IE. If anyone reading this wants to test it out, please let me know either here or on the support forum if you have problems. I'd really like to resolve that issue.

[1]: http://wordpress.org/extend/plugins/ctrl-s/ "Ctrl-S WordPress Plugin"
[2]: http://wordpress.org/extend/plugins/quick-preview/ "Quick Preview WordPress Plugin"