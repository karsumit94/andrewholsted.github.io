---
layout: "post"
title: "Windows on a Mac"
date: 2013-10-18 09:04 UTC
tags: "Windows OSX"
meta-description: "Running windows on a Mac with Bootcamp & Parallels"
---
<div id="youtube">
<iframe width="640" height="480" src="//www.youtube.com/embed/5OaeleO6-w0" frameborder="0" allowfullscreen></iframe>
</div>

Last week, I got a job as a C#/.Net Developer. This week, I started learning C#/.Net. I'm kidding, I started last week. One thing you should know about Windows development, is that it does indeed require Windows. 

My options included:

1. Buying a PC
2. Running Windows on my Mac

I went with option 2. Luckily, it was quite easy to get setup. Shall we?

Quick checklist - Do you currently have a USB flash drive with > 4Ggb of space, a Windows 7 or 8 .iso image, and a valid Windows product key? If not, then please acquire said items on the interwebs first. We will be here when you get back.

Now, I will assume you have a flash drive, a Windows .iso image, and a valid product key. Good job. 

*I should mention that you don't have to install Windows via Bootcamp if you are only going to use a virtual machine. If you want the option of booting directly to Windows, then follow along.*

On OSX, open the Bootcamp Assistant. A quick search in Alfred or Finder should get you there. Follow the prompts, and install Windows on a Bootcamp partition. 

Here's the [setup and installation guide](http://manuals.info.apple.com/MANUALS/1000/MA1583/en_US/boot_camp_install-setup_10.7.pdf) from Apple. Couldn't hurt to look through it. And here's a [tutorial](http://blog.laptopmag.com/how-to-install-windows-7-on-a-macbook-pro-with-retina-display) with some pretty pictures. 

I have a 128gb SSD. It's not the largest, but it's what I could afford at the time. I gave the Windows partition 40 gigs. Some people recommend more, but I think it will be fine for my needs. After completing a basic Windows 7 install, and installing Visual Studio Express 2012, there's still 20gb left on the Windows partition. Meaty. 

After the installation finishes, you'll be able to boot straight into Windows or OSX, whenever you please. However, you will need to reboot every time you want to switch operating systems. That's a pain in the ass. From my quick and non-extensive Googling, I found Parallels which will let you run Windows from your Bootcamp partition without rebooting. Pefect. The only problem I have with Parallels is that the icon in the dock looks terrible.

Parallels may or may not start running in Coherence mode from the get go. The goal of Coherence mode is to try and integrate your Windows virtual machine as natively as possible with Mac OSX. Personally, I wasn't a fan of it. I prefer to keep my Windows and OSX applications a little more separate, but I still don't want to have to reboot every time. Now, I open Parallels in a separate maximized window, and I can easily slide back and forth between them. The video at the top is what my current setup looks like, and I'm really enjoying it. 


