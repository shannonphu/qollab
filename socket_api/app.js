const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('./server-socket-event-handler')(server);
const axios = require('axios');

// POST form data is "url-encoded", so decode that into JSON for us
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(process.env.PORT || 3003, () => {
	console.log("Listening on port " + process.env.PORT);
});
