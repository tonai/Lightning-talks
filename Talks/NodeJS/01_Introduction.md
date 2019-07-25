# Introduction

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [What is NodeJS ?](#what-is-nodejs-)
  - [What it is not ?](#what-it-is-not-)
  - [So what is it ?](#so-what-is-it-)
- [What can we do with ?](#what-can-we-do-with-)
  - [Cons](#cons)
  - [Pros](#pros)
- [Highlights](#highlights)
  - [Very active community](#very-active-community)
  - [Full-Stack JavaScript](#full-stack-javascript)
  - [Real-time applications](#real-time-applications)
- [Conclusion](#conclusion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is NodeJS ?

### What it is not ?

* It is not a language
* It is not a framework
* It is not a server

### So what is it ?

It is a JavaScript execution environment that is built on the Chrome V8 engine with a CLI.

Hello world in PHP (hw.php) :
```PHP
<?php
echo "Hello world !\n";
```

Execution :
```shell
php hw.php
```

Hello world in JS (hw.js) :
```JavaScript
console.log('Hello world !');
```

Execution :
```shell
node hw.js
```

It is not a framework, but some frameworks exist :
* [Express](http://expressjs.com/)
* [socket.io](http://socket.io/)
* [Sails](http://sailsjs.org/)
* [Meteor](https://www.meteor.com/)
* [hapi](http://hapijs.com/)
* ...etc.

It is not a server, but you can use NodeJS to create a server.

Example (http-server.js) :
```JavaScript
const PORT=8080;

require('http')
  .createServer(function(request, response){
    response.end('It Works!');
  })
  .listen(PORT, function(){
    console.log('Server listening on: http://localhost:%s', PORT);
  });
```

In comparison, for PHP you will need a tierce application like Apache or NGINX...etc.

## Pros and cons

### Cons

* It is single-threaded => No vertical scalability
* It is inadequate for CPU-intensive applications
* It is also inadequate if used with relational databases

### Pros

* It is single-threaded
  * No thread or process overhead
  * No concurrency problem
* It is non blocking
  * Event-based
  * Asynchronous
* Fast
  * V8 JavaScript Runtime engine and the Node wrapper are written using C language
  * NodeJS can handle thousands of concurrent connections with a very minimal overhead on a single process
* It uses JavaScript
  * Easy to learn
  * Same language as frontend for web application
  * No data transformation (JSON)
  * Very active community

## Highlights

### Very active community

`npm` is the package manager for the JS community (like `Packagist` is for PHP) and in mid 2014 it becomes the biggest one (with approximately 80 000 modules).

Early 2016, it has now 240 000 module with a growth of about 400 modules per day.

Source : http://www.modulecounts.com/

### Full-Stack JavaScript

The stack is composed of the following elements :
* A JSON database like mongoDB, CouchDB...etc.
* A JS server-side framework like Express, Socket.io...etc.
* A JS front-side framework like Angular, React...etc.

This is comparable to the well-known LAMP platform.  

Some tools helps you to scaffold this kind of project like :
* [MEAN](http://mean.io/)
* [MERN](http://mern.io/)

Advantages (not counting the advantages of each tool one by one) :
* On language used : JavaScript
* There is no data transformation from the database to the client

### Real-time applications

NodeJS Real-time applications are quite easy to build using WebSockets.

This is made possible by providing a standardized way for the server to send content to the browser without being solicited by the client, and allowing for messages to be passed back and forth while keeping the connection open.

Simple websocket server (ws-server.js) :
```JavaScript
var ws = require("nodejs-websocket");
const PORT = 8080;

var server = ws.createServer(function (connection) {
  connection.on("text", function (message) {
    console.log('received: %s', message);
    connection.sendText('It Works!');
  });
}).listen(PORT);
```

Simple websocket client (ws-client.js) :
```JavaScript
var WebSocket = require('ws');
const URL = 'ws://localhost:8080';

var ws = new WebSocket(URL);
ws.on('open', function() {
  ws.send('Request 1 from the client');
  setTimeout(function(){ws.send('Request 2 from the client');}, 1000);
});
ws.on('message', function(message) {
  console.log('received: %s', message);
});
```

By using Websockets the network payload is much smaller than with HTTP.

HTTP request captured with  tcpdump : `tcpdump -A port 8080` (length 436)
```
GET / HTTP/1.1
Host: bench.lxc:8080
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4,de-DE;q=0.2,de;q=0.2
```

HTTP response captured with  tcpdump : `tcpdump -A port 8080` (length 108)
```
HTTP/1.1 200 OK
  te: Mon, 22 Feb 2016 15:27:41 GMT
Connection: keep-alive
Content-Length: 9

It Works!
```

With websocket you need to open the connection first.

WebSocket handshake request captured with  tcpdump : `tcpdump -A port 8080` (length 223)
```
GET / HTTP/1.1
Connection: Upgrade
Upgrade: websocket
Host: bench.lxc:8080
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: MTMtMTQ1NjE1NzM5MzUyNw==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

WebSocket handshake response captured with  tcpdump : `tcpdump -A port 8080` (length 129)
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: UVRBegjxttZbET/FIpVUHDkY12s=
```

Then the server or the the client can send a message at low cost.

WebSocket message captured with tcpdump : `tcpdump -A port 8080` (length 11)
```
It Works!
```

Live example with a shared todo list : https://tocab.meteor.com/

## Conclusion

For now there is no big tool such as Drupal, Magento, Liferay...etc. that is built in top of NodeJS.

For building websites, there only are frameworks that are available, so NodeJS is adapted for specific project only.

NodeJS is well-suited for :
* Building centralized API exposing JSON web services (RESTful architecture)
* Real-time applications
* A specific website using a JSON database as storage
