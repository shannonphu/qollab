var testDBURL = 'mongodb://db_mongo';
var Lecture = require('../db/lecture.js');
var mongoose = require('mongoose');

beforeAll(() => {
    mongoose.connect(testDBURL)
});

beforeEach(() => {
    return Lecture.remove({})
})

afterAll((done) => {
    mongoose.disconnect(done);
});

test('Creating a lecture', done => {
    function callback(data) {
        expect(data.title).toEqual('Math')
        expect(data.instructor).toEqual(null)
        expect(data.students.length).toEqual(0)
        expect(data.joinCode.length).toEqual(6)
        done();
    }

    Lecture.insert('Math', null, callback);
});

test('Getting a lecture join code', done => {
    function callback(data) {
        expect(data.title).toEqual('Math')
        expect(data.instructor).toEqual(null)
        expect(data.students.length).toEqual(0)
        expect(data.joinCode.length).toEqual(6)
        done();
    }

    Lecture.insert('Math', null, (lecture) => {
        Lecture.findByJoinCode(lecture.joinCode, callback);
    });
});

test('Adding comment to lecture - return comment', done => {
    function callback(comment) {
        expect(comment.text).toEqual('commentText');
        expect(comment.annotation).toEqual(null);
        done();
    }

    Lecture.insert('COM SCI 130', null, (lecture) => {
        Lecture.addComment(lecture.joinCode, "commentText", null, callback);
    });
});

test('Get lecture comments', done => {
    function callback(comments) {
        expect(comments.length).toEqual(1);
        expect(comments[0].text).toEqual("commentText");
        expect(comments[0].annotation).toEqual(null);
        done();
    }

    Lecture.insert('COM SCI 130', null, (lecture) => {
        Lecture.addComment(lecture.joinCode, "commentText", null, () => {
            Lecture.getComments(lecture.joinCode, callback);            
        });
    });
});

test('Set canvas for lecture', done => {
    function callback(lecture) {
        expect(lecture.canvas).toEqual("{objects:[]}");
        done();
    }

    Lecture.insert('COM SCI 130', null, (lecture) => {
        Lecture.setCanvas(lecture.joinCode, "{objects:[]}", callback);
    });
});