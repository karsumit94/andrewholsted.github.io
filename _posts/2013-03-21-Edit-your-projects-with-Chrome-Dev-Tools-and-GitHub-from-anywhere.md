---
layout: "post"
title: "Hotfix"
meta-description: "Hotfix is a Chrome extension that lets you save changes in 
Chrome Dev Tools to GitHub."
tags: "Javascript, Github, Chrome extension"
---

One day at work I noticed I messed up the layout of this site with some changes 
I pushed earlier that morning.Things looked fine on my home computer, but due to
different screen resolutions and an older browser, it looked pretty bad. I 
wasn't going to be home for another 6 hours and doing any kind of local 
development on my work computer was out of the question. I needed a simple way 
to make changes to my site using only a browser.

And now I have one.

[![hotfix logo][2]][1] 

Hotfix is a Chrome extension that I've been working on for the last month or so. 
It allows you to make changes in Chrome Developer Tools and push them directly to 
GitHub. No more saving locally and then committing. You can edit the CSS and 
Javscript of your projects from anywhere at anytime.

Here's a brief demo of how the extension works. 

<http://www.youtube.com/watch?v=ASRf2XC1wtU>

Things get even better when you set up a post-receive hook for your repository 
on GitHub.  In my case, I set up a simple web hook that runs a script to pull in
the latest changes from GitHub. I can now edit this site from anywhere with an 
internet connection, and see the changes reflected immediately. I'll talk more 
about that process in my next post. In the mean time, feel free to install the 
extension by visiting the Chrome Web Store or forking the project on GitHub.

<span class="cws-link"><a href="https://chrome.google.com/webstore/detail/hotfix/bfmckmhcljhakgkngnfjhmmffaabdafi">Chrome Web Store</a>
</span> 
<span class="github-link"><a href="https://github.com/FajitaNachos/hotfix">
GitHub Repository</a></span>


[1]: https://chrome.google.com/webstore/detail/hotfix/bfmckmhcljhakgkngnfjhmmffaabdafi
[2]: /img/hotfix-logo.png "hotfix"
