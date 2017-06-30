# WebPush-API-using-Node

Framework : Nodejs + Express + EJS(View Engine)
Node module used for WebPush API : web-push

Working : 
1) When Client hits the application for first time, server creates a VAPID key - (VAPID has private and public key) and send public key across to client(browser) to store.
2) Client stores this public key and then registers the service worker agent (browser service workers) and subscribe to it using this public key.
3) Browser then communicates with service worker and gets the subscription token and it makes a post call to application  by passing the message and this token. 
4) Application than sends message to service worker using the subscription token and Vapid private/public keys.
5) Service worker then push down the message to the client if subscription token and VAPID keys are valid.

https://rossta.net/blog/using-the-web-push-api-with-vapid.html

Directory structure : scripts -  application.js - Validates whether browser supports notification, creates service worker, Registers it                                                     and subscribes to it.
                                 serviceworker.js - Has push eventlistener which pushes the message to client.(It gets registered within                                                        application.js)
                                 app.js -  Start script of node server. Creates VAPID Key and pass it to client. Postback handler to send                                             notification to service worker.
                                 index.ejs - Index page of the application.
                                 
                                 
                                 
                                 
