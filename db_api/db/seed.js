const Lecture = require('./lecture.js');
const User = require('./user.js');

user = new User();

// Seed data for mock users and lectures
User.insert(user.id, (instructor_1) => {
	Lecture.insert("COM SCI 130", instructor_1.id, (newLecture) => {
		console.log("Inserted new lecture with code " + newLecture.joinCode);
		console.log('Instructor Id is ' + newLecture.instructor);

		User.addLecture(instructor_1.id, newLecture);
	});

	Lecture.insert("COM SCI 181", instructor_1.id, (newLecture) => {
		console.log("Inserted new lecture with code " + newLecture.joinCode);
		console.log('Instructor Id is ' + newLecture.instructor);

		User.addLecture(instructor_1.id, newLecture);

		Lecture.addComment(newLecture.joinCode, "some text", null);
		Lecture.addComment(newLecture.joinCode, "some text 2", null, () => {
			Lecture.getComments(newLecture.joinCode, (comments) => {
				console.log(comments);
			});
		});
	});
});