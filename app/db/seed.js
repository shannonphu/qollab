const Lecture = require('./lecture.js');
const User = require('./user.js');
const mongoose = require('mongoose');

// Seed data for mock lectures
let user1 = User();
Lecture.insert("Lecture 1", user1, (newLecture, user) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
	console.log('Instructor Id is ' + newLecture.instructor);
});

let user2 = User();
Lecture.insert("Lecture 2", user2, (newLecture, user) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
	console.log('Instructor Id is ' + newLecture.instructor);
});
