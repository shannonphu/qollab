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
// Creates seed data to populate database
const seedData = require('./db/seed.js');

app.set('view engine', 'hbs');
app.use(express.static('public'));

// TODO: Replace root view with a TBD first user view
app.get('/', (req, res) => {
	res.render('home', {
		title: "Home"
	});
});

app.get('/lecture/join', (req, res) => {
	res.render('lecture_join');
});

app.post('/lecture/join', (req, res) => {
	Lecture.findByJoinCode(req.body.join_code, (lecture) => {
		if (lecture) {
			res.render('home', {
				title: lecture.title
			});
		} else {
			res.render('lecture_join');
		}
	});
});

server.listen(3000, () => {
	console.log("Listening on port 3000");
});