---
layout: "post"
title: "Windows on a Mac"
date: 2013-10-18 09:04 UTC
tags: "Jobs"
published: false
meta-description: "Running windows on a Mac via Bootcamp & Parallels"
---
<div id="youtube">
<iframe width="640" height="480" src="//www.youtube.com/embed/5OaeleO6-w0" frameborder="0" allowfullscreen></iframe>
</div>

Last week, I got a job as a C#/.Net Developer. This week, I started learning C#/.NET. Yay!.

My options included:

1. Buy a PC
2. Run Windows on a Mac

I went with option 2. Luckily, it's a piece of cake. 

Quick checklist - Do you currently have a USB flash drive with > 4g of space, a Windows .iso image, and a valid Windows product key? If not, then please acquire said items on the interwebs. We will be here when you get back.

Now, we can safely assume you have a flash drive, a Windows .iso image, and a valid product key. Great! 

*I should mention that you don't have to install Windows via Bootcamp if you only want to use a virtual machine. I wanted to have the option of booting directly to Windows though, so I chose to go the Bootcamp route + VM.*

On OSX, open the Bootcamp Assistant. A quick search in Alfred or Finder should get you there. Follow the prompts, and install Windows on a Bootcamp partition. 

Here's the [setup and installation guide](http://manuals.info.apple.com/MANUALS/1000/MA1583/en_US/boot_camp_install-setup_10.7.pdf) from Apple. Couldn't hurt to look through it. And here's a [tutorial](http://blog.laptopmag.com/how-to-install-windows-7-on-a-macbook-pro-with-retina-display) with some pretty pictures. 

I have a 128gb SSD. Not the largest, I know, but it's what I could afford at the time. I gave the Windows partition 40 gigs. Some people recommend more, but I think it will be fine for my needs. After completing a basic Windows 7 install, and installing Visual Studio Express 2012, I have 20gb left on the Windows partition and things are working quite well. 

Once you're finished with the Bootcamp Assistant, you'll be able to boot straight into Windows or OSX, whenever you please. However, I found it to be a pain in the ass to have to reboot every time I wanted to switch operating systems.From my quick and non-extensive Googling, I cam across 3 different virtual machines: Parallels, VM Fusion, and Virtual Box. Take your pick, or try all three. I'm currently on a two week trial of Parallels, and I like it so far.

If you install Parallels, it should start running in Coherence mode automatically. Personally, I wasn't much of a fan of the Coherence mode. I prefer to keep my Windows and OSX applications a little more separate, but I don't want to have to reboot every time. So instead, I open Parallels in a separate maximized window (not cohesive mode), and now I can easily slide back and forth between them, and each still gets a full screen. The video at the top is what my current setup looks like, and I'm really enjoying it. 


