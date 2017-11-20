const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// POST form data is "url-encoded", so decode that into JSON for us
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to databse and declare database Models
const db = require('./db/db.js');
const Lecture = require('./db/lecture.js');
const User = require('./db/user.js');
// Creates seed data to populate database
const seedData = require('./db/seed.js');

app.set('view engine', 'hbs');
app.use(express.static('public'));

// CORS setting with OPTIONS pre-flight handling
// * Fixes the No 'Access-Control-Allow-Origin' header is present on the requested resource error
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin');

    if ('OPTIONS' == req.method) res.sendStatus(200);
    else next();
});

app.get('/lecture/:joinCode', (req, res) => {
	let joinCode = req.params.joinCode;
	Lecture.findByJoinCode(joinCode, (lecture) => {
		res.json(lecture);
	});
});

app.post('/create', (req, res) => {
	Lecture.insert(req.body.lectureName, req.body.instructorId, (lecture) => {
		res.json(lecture);		
	});
});

// Store new comment inside a lecture
app.post('/comment/create', (req, res) => {	
	Lecture.addComment(req.body.joinCode, req.body.text, req.body.annotationId, (comment) => {
		res.send(comment);
	});
});

server.listen(3005, () => {
	console.log("Listening on port 3005");
});
