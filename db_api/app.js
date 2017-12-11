const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// POST form data is "url-encoded", so decode that into JSON for us
const bodyParser = require('body-parser');
app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.json());

// Login with Passport.js
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const session = require('express-session');
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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
	res.header('Access-Control-Allow-Credentials', 'true');
	
	if ('OPTIONS' == req.method) res.sendStatus(200);
	else next();
});

app.get('/lecture/:joinCode', (req, res) => {
	let joinCode = req.params.joinCode;
	Lecture.findByJoinCode(joinCode, (lecture) => {
		res.json(lecture);
	});
});

app.post('/create', ensureAuthenticated, (req, res) => {
	let userID = req.user._id;
	Lecture.insert(req.body.lectureName, userID, (lecture) => {
		User.addLecture(userID, lecture);
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

// LOGIN FUNCTIONALITY
GOOGLE_CONSUMER_KEY = '758504996172-t1em8jal6nt9tfa8mas49c0t9ibkaf17.apps.googleusercontent.com';
GOOGLE_CONSUMER_SECRET = 'Kt8WmTm3X5Thi1HMFVAK-s3L';
passport.use(new GoogleStrategy({
	clientID: GOOGLE_CONSUMER_KEY,
	clientSecret: GOOGLE_CONSUMER_SECRET,
	callbackURL: "http://localhost:3005/auth/google/callback"
},
	function (token, tokenSecret, profile, done) {
		User.findByGoogleID(profile.id, (user) => {
			if (!user) {
				User.insert(profile.id, (user) => {
					return done(null, user);
				});
			} else {
				return done(null, user);
			}
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/auth/google' }), (req, res) => {
		res.redirect('http://localhost:3000/join');
	});

function ensureAuthenticated(req, res, next) {
	if (req.user) {
		return next();
	} else {
		res.redirect('/auth/google');
	}
}