var testDBURL = 'mongodb://db_mongo';
var mongoose = require('mongoose');
const commentDefinition = require('../db/comment.js');
const Comment = commentDefinition.model;

beforeAll(() => {
    mongoose.connect(testDBURL)
});

beforeEach(() => {
    return Comment.remove({})
})

afterAll((done) => {
    mongoose.disconnect(done);
});

test('Creating a new comment (not inserted yet)', () => {
    let comment = Comment.create("commentText", null);
    expect(comment.text).toEqual('commentText');
    expect(comment.resolved).toEqual(false);
    expect(comment.replies.length).toEqual(0);
    expect(comment.votes).toEqual(0);
});

test('Inserting a new comment (and persisting)', done => {
    function callback(newComment) {
        expect(newComment.text).toEqual('commentText')
        expect(newComment.resolved).toEqual(false)
        expect(newComment.replies.length).toEqual(0)
        expect(newComment.votes).toEqual(0)
        done();
    }

    Comment.insert("commentText", null, callback);
});

test('Get a comments ID', done => {
    function callback(newComment) {
        expect(newComment.text).toEqual('specialComment');
        expect(newComment.resolved).toEqual(false);
        expect(newComment.replies.length).toEqual(0);
        expect(newComment.votes).toEqual(0);
        done();
    }

    Comment.insert("specialComment", null, (comment) => {
        Comment.getByID(comment._id, callback);
    });
});

test('Resolving a comment', done => {
    function callback(comment) {
        expect(comment.resolved).toEqual(true);
        done();
    }

    Comment.insert("commentText", null, (comment) => {
        Comment.resolve(comment._id, callback);
    });
});

test('Upvoting a comment', done => {
    function callback(comment) {
        expect(comment.votes).toEqual(2);
        done();
    }

    Comment.insert("commentText", null, (comment) => {
        Comment.upvote(comment._id);
        Comment.upvote(comment._id, callback);
    });
});

test('Replying to a comment', done => {
    function callback(comment) {
        expect(comment.replies.length).toEqual(1);
        done();
    }

    Comment.insert("commentText", null, (comment) => {
        Comment.addReply(comment._id, "reply1", callback);
    });
});