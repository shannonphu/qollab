const Lecture = require('./lecture.js');
const User = require('./user.js');
const mongoose = require('mongoose');


//  Create dummy user.
let user = User();

// Seed data for mock lectures
Lecture.insert("Lecture 1", user, (newLecture, user) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
	console.log('Instructor Id is ' + newLecture.instructor);
});

// TODO: Use user account based system to associate each user with their lectures.

module.exports = {
	user: user
};
