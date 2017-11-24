const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
let canvas = {};
const socket = require('./server-socket-event-handler')(server, canvas);
const axios = require('axios');

// POST form data is "url-encoded", so decode that into JSON for us
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// CORS setting with OPTIONS pre-flight handling
// * Fixes the No 'Access-Control-Allow-Origin' header is present on the requested resource error
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin');

    if ('OPTIONS' == req.method) res.send(200);
    else next();
});

server.listen(3003, () => {
	console.log("Listening on port 3003");
});

app.get('/canvas/:code', (req, res) => {
	let code = req.params.code;
	if (code in canvas) {
		let json = canvas[code]["canvas"];
		res.send(json);
	} else {
		res.send(null);
	}
});

// Gets comments stored on server for this lecture code
app.get('/comments/:code', (req, res) => {
	let code = req.params.code;
	if (code in canvas) {
		let json = canvas[code]["comments"];
		res.send(json);
	} else {
		res.send([]);
	}
});