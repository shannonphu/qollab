const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('./server-socket-event-handler')(server);

// POST form data is "url-encoded", so decode that into JSON for us
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to databse and declare database Models
const db = require('./db/db.js');
const Comment = require('./db/comment.js');
const Lecture = require('./db/lecture.js');
const User = require('./db/user.js');
// Creates seed data to populate database
const seedData = require('./db/seed.js');

app.set('view engine', 'hbs');
app.use(express.static('public'));

// TODO: Replace root view with a TBD first user view
app.get('/', (req, res) => {
	res.send("Qollab's landing page.");
});

app.get('/lecture/:joinCode', (req, res) => {
	let joinCode = req.params.joinCode;
	Lecture.findByJoinCode(joinCode, (lecture) => {
		res.render('lecture', {
			lecture: lecture
		});
	});
});

app.get('/join', (req, res) => {
	res.render('lecture_join');
});

app.post('/join', (req, res) => {
	res.redirect('lecture/' + req.body.join_code);
});

app.get('/create', (req, res) => {
	res.render('lecture_create');
});

app.post('/create', (req, res) => {
	Lecture.insert(req.body.lecture_name, (lecture) => {
		res.render('lecture_create', {
			code: lecture.joinCode
		})
	});
});

server.listen(3000, () => {
	console.log("Listening on port 3000");
});
