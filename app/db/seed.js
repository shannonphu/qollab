const Lecture = require('./lecture.js');

// Seed data for mock lectures
Lecture.insert("Lecture 1", (newLecture) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
});

Lecture.insert("Lecture 2", (newLecture) => {
	console.log("Inserted new lecture with code " + newLecture.joinCode);
});