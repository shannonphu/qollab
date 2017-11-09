const Lecture = require('./lecture.js');
const mongoose = require('mongoose');

// Seed data for mock lectures
Lecture.insert("Lecture 1", mongoose.Types.ObjectId(), (newLecture) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
	console.log('Instructor Id is ' + newLecture.instructor);
});

Lecture.insert("Lecture 2", mongoose.Types.ObjectId(), (newLecture) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
	console.log('Instructor Id is ' + newLecture.instructor);
});
