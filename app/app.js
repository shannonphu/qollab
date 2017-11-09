const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser')
const app = express();
const server = http.createServer(app);
const socket = require('./server-socket-event-handler')(server);

// POST form data is "url-encoded", so decode that into JSON for us
const bodyParser = require('body-parser');
app.use(cookieParser());
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
	res.render('landing');
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
	//  Determine if cookie exists. 
	// If it exists we will directly join the user into his / her lecture.
	if (!('userId' in req.cookies)) {
		res.render('lecture_join');
	} else {
		let userId = req.cookies.userId;
		User.findById(userId, function (err, user) {
			if (err) {
				throw err;
			}

			if (user == null) {
				console.log(`User ${userId} does not exist.`);
				res.render('lecture_join');
			} else {
				//  use the joincode associated with the current user
				res.redirect('lecture/' + user.joinCode);
			}
		});
	}
});

app.post('/join', (req, res) => {
	res.redirect('lecture/' + req.body.join_code);
});

app.get('/create', (req, res) => {
	res.render('lecture_create');
});

app.post('/create', (req, res) => {
	User.create({}, (err, user) => {
		if (err) {
			throw err;
		}
		Lecture.insert(req.body.lecture_name, user, (lecture, instructor) => {
			let joinCode = lecture.joinCode;
			
			//  Associate the user with the lecture join code
			instructor.joinCode = joinCode;
			instructor.save((err) => {
				if (err) {
					throw err;
				}

				//  Set cookie for the user
				res.cookie('userId', instructor.id);
				res.render('lecture_create', {
					code: joinCode
				})
			});
		});
	});
});

server.listen(3000, () => {
	console.log("Listening on port 3000");
});
