---
layout: "post"
title: "Authenticating with the GitHub API"
meta-description: "How to authenticate with the GitHub API using Javascript."
tags: "GitHub, Javascript"
---

I've been working on a chrome extension for the last few weeks that utilizes the
GitHub API. It's my first time working with an API and I've enjoyed it thus far. 
Everything is written in Javascript with a little Node.js on the server. Here's 
the process.

Setup an application on GitHub
----------------------------------

The first thing you need to do is login to your GitHub account. Once logged in, 
click on the wrench icon (account settings) at the top and then click on 
Applications on the left. Click on Register New Application.

![GitHub-Setup][1]

Now give the application a name, main URL, and callback URL. The 
callback URL is where GitHub will redirect your users to after they successfully 
login. It has to be on the same domain as your main URL. It also needs to be a 
valid http:// URL. GitHub won't accept 'localhost', 'your mom', etc..

![New-GitHub-Application][2]

Seeing as how I am writing a browser extension, I REALLY didn't want to have to 
set up a server just for the extension. However, doing the entire Oauth process 
on the client side would expose my GitHub client secret, and that's never a good 
thing. So in the end, I bit the bullet and set up a simple node.js server.  I 
decided to go with [Nodejitsu][3] instead of using my existing server. I'll get 
into some of the code down below, but you can use any server you have access too. 
Also, there's no repercussions to setting up an application on GitHub. It doesn't 
cost anything, and you can delete it at any time.

Redirect your users to GitHub and get an Access Code
----------------------------------------------------

When you are ready to authenticate a user you'll need to send them to GitHub to 
request an access code for you application.

```javascript
window.open('https://github.com/login/oauth/authorize?client_id=your-client-id');
```

You can find your client ID on the in your GitHub account settings page under 
Applications. Click on your application name and the client id will be in the 
top right. There are several other parameters you can (and should) append to the 
URL. Here are the available parameters;

**client_id**  *Required* - The client ID you received from GitHub when you registered the application.

**redirect_uri** *Optional*  - URL in your app where users will be sent after authorization.

**scope**  *Optional*  - Comma separated list of [scopes][4].

**state**  *Optional*  - An unguessable random string. It is used to protect against cross-site request forgery attacks.

You can add any of these parameters to the URL by adding an & between them. For example

```javascript
window.open('https://github.com/login/oauth/authorize?client_id=your-client-id&scopes=scopes&state=unguessable-string');
```

Once redirected to GitHub the user will be prompted to login. After they do, 
GitHub will redirect back to the Callback URL you set up with an access code in the url.

Parse the access code from the URL and exchange it for an auth token
----------------------------------------------------------------------------------

Once GitHub redirects back to your Callback URL with an access code, you need to exchange it for an auth token.

Get the access code from the URL

```javascript
// Get the authorization code from the url that was returned by GitHub

var authCode = getAuthCode(window.location.href);

// Extract the auth code from the original URL

function getAuthCode(url){
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
        throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
}

```

And exchange this for an auth token by sending a POST request to

```javascript
https://github.com/login/oauth/access_token?client_id=your-client-id&client_secret=your-client-secret&code=your-access-code
```

Your client secret can be found in the same place as your client id from above. 
You should never share this secret with anyone. It's called a client *secret* 
for a reason.

Regarding the POST request, I'm using [Gatekeeper][5] to handle the 
authentication with GitHub on my nodejitsu server. Here is a small snippet of 
relevant code from Gatekeeper. If you want to implement it yourself, grab it 
from GitHub and let me know if you have any questions. The only change I made 
was replacing a deprecated Express call and adding a few small features like 
404 handling.

```javascript
function authenticate(code, cb) {
    var data = qs.stringify({
        client_id: config.oauth_client_id, //your GitHub client_id
        client_secret: config.oauth_client_secret,  //and secret
       code: code   //the access code we parsed earlier
    });

    var reqOptions = {
        host: 'github.com',
        port: '443',
        path: '/login/oauth/access_token',
        method: 'POST',
        headers: { 'content-length': data.length }
    };

    var body = '';
    var req = https.request(reqOptions, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) { body += chunk; });
        res.on('end', function() {
            cb(null, qs.parse(body).access_token);
        });
    });

    req.write(data);
    req.end();
    req.on('error', function(e) { cb(e.message); });
}
```

This is just a small snippet to illustrate what is going on. Once you send the 
POST request, GitHub will return a response that looks like this

```javascript
access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&token_type=bearer
```

From here you just need to parse the auth token and save it somewhere. 
Going forward, when you want to make an API call, you need to retrieve the 
auth token from wherever you saved it and send it along with your request.

Check the [GitHub documentation][6] for more details.

Also, if you're looking to work with the GitHub API via Javascript, I highly 
recommend [GitHub.js][7] and [Gatekeeper][5]. Both have helped me immensely in 
getting this extension off the ground. I'm still working on a few minor bugs 
but I'm hoping to release it in the chrome store in a couple more weeks.

[1]: /images/github-app-setup.jpg "GitHub Applications"
[2]: /images/github-app-new.jpg "New GitHub Application"
[3]: https://www.nodejitsu.com/ "Nodejitsu"
[4]: http://developer.github.com/v3/oauth/#scopes
[5]: https://github.com/prose/gatekeeper "Gatekeeper.js"
[6]: href="http://developer.github.com/v3/ "GitHub Documentation"
[7]: https://github.com/michael/github "GitHub.js"
