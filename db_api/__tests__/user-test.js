var testDBURL = 'mongodb://db_mongo';
var mongoose = require('mongoose');
var Lecture = require('../db/lecture.js');
const User = require('../db/user.js');

beforeAll(() => {
    mongoose.connect(testDBURL)
});

beforeEach(() => {
    return User.remove({})
})

afterAll((done) => {
    mongoose.disconnect(done);
});

test('Inserting a new user', done => {
    function callback(newUser) {
        expect(newUser.googleID).toEqual('googleID');
        expect(newUser.lectures.length).toEqual(0);
        done();
    }

    User.insert('googleID', callback);
});

test('Find a user by Google ID', done => {
    function callback(user) {
        expect(user.googleID).toEqual('googleID');
        expect(user.lectures.length).toEqual(0);
        done();
    }

    User.insert('googleID', (user) => {
        User.findByGoogleID(user.googleID, callback);
    });
});

test('Add lecture to user', done => {
    function callback(user) {
        expect(user.googleID).toEqual('googleID');
        expect(user.lectures.length).toEqual(1);
        done();
    }

    User.insert('googleID', (user) => {
        Lecture.insert('Math', user._id, (lecture) => {
            User.addLecture(user._id, lecture, callback);
        });
    });
});