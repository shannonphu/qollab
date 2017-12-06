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
const User = require('./db/user.js');
const Lecture = require('./db/lecture.js');
const commentDefinition = require('./db/comment.js');
const Comment = commentDefinition.model;
// Creates seed data to populate database
const seedData = require('./db/seed.js');

// CORS setting with OPTIONS pre-flight handling
// * Fixes the No 'Access-Control-Allow-Origin' header is present on the requested resource error
app.use(function (req, res, next) {
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
		User.addLecture(req.body.instructorId, lecture);
		res.json(lecture);
	});
});

// Gets comments stored for this lecture code
app.get('/comments/:code', (req, res) => {
	let code = req.params.code;

	Lecture.getComments(code, (comments) => {
		res.json(comments);
	});
});

// Store new comment inside a lecture
app.post('/comment/create', (req, res) => {
	Lecture.addComment(req.body.joinCode, req.body.text, JSON.stringify(req.body.annotation), (comment) => {
		res.send(comment);
	});
});

app.post('/comment/reply', (req, res) => {
	Comment.getByID(req.body.commentID, (comment) => {
		if (!comment.resolved) {
			Comment.addReply(req.body.commentID, req.body.replyText, (comment) => {
				res.send(comment);
			});
		} else {
			res.send(comment);
		}
	})
});

app.post('/comment/upvote', (req, res) => {
	Comment.getByID(req.body.commentID, (comment) => {
		if (!comment.resolved) {
			Comment.upvote(req.body.commentID, (comment) => {
				res.send(comment);
			});
		} else {
			res.send(comment);
		}
	})
});

app.post('/comment/resolve', (req, res) => {
	Comment.resolve(req.body.commentID, (comment) => {
		res.send(comment);
	});
});

app.post('/canvas/set', (req, res) => {
	Lecture.setCanvas(req.body.joinCode, req.body.canvasJSON, (lecture) => {
		res.send(lecture);
	});
});

server.listen(3005, () => {
	console.log("Listening on port 3005");
});
