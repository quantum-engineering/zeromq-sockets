/**
 * app.js
 * @flow
 */

"use strict";

var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


// Generate Fake Users with faker

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS middleware

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", function(req, res) {
	res.sendFile("public/index.html")
});

io.on("connection", function(socket) {
	console.info("client connection established")
	socket.on("chat message", function(msg) {
		console.info("message:", msg)
	})
});

var chat = io
	.of("/chat")
	.on("connection", (socket) => {
		console.info("client connected to /chat")
		socket.emit("intro", {
			message: "Welcome to Chat Channel Page with socket"
		})
	})
	.on("chat message created", (msg) => {
		console.info("message:", msg)
	})


server.listen(1337, function() {
	var port = server.address().port;
	console.info("App server is running on port:", port)
})

module.exports = app;
