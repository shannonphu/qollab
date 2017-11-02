const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('./server-socket-event-handler')(server);

// Database Models
const Comment = require('./db/comment.js');

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home', {
		title: "Home",
		content: "Hello world"
	});
});

server.listen(3000, () => {
	console.log("Listening on port 3000");
});