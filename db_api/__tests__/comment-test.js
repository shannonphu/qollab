import React from 'react';
var testDBURL = 'mongodb://db_mongo';
var Comment = require('../db/comment.js');
var mongoose = require('mongoose')


const testComment = {
    text: "Hello, World!",
    resolved: false,
    replies: [],
    votes: 0
}

beforeAll(() => {
    mongoose.connect(testDBURL)

});

beforeEach(() => {
    return Comment.remove({})
})

afterAll((done) => {
    mongoose.disconnect(done);
});

describe('Commenting', () => {
test('Test creating comment', done => {
    return Comment.insert(testComment.text, (newComment) => {
           var query = Comment.findOne({})
           query.exec(function (err, data) {
               if (err) throw err;
               expect(data.text).toEqual(testComment.text)
               expect(data.resolved).toEqual(testComment.resolved)
               expect(data.replies.length).toEqual(testComment.replies.length)
               expect(data.votes).toEqual(testComment.votes)
               done();
           })
       });
});

test('Test comment upvoting', () => {
    var comment = new Comment({text: "Hi"});
    for (var i = 0; i < 5; i++){
        comment.upvote()
    }
    expect(comment.votes).toBe(5);
});
})

describe('Replying to comments', () => {
    var comment = new Comment({text: "Hi"});
    comment.addReply("reply1")
    test('Test reply is added', () => {
        expect(comment.replies[0]).toBe("reply1");
    });
    test('Test multiple replies', () => {
        comment.addReply("reply2")
        expect(comment.replies.length).toBe(2);
        expect(comment.replies[1]).toBe("reply2");
    });

})

describe('Resolving comments', () => {
    var comment = new Comment({text: "Hi"});
    comment.upvote();
    comment.resolve();

    test('Test comment marked as resolved', () => {
        expect(comment.resolved).toBe(true);
    });
    test('Test cannot upvote resolved comment', () => {
        comment.upvote();
        expect(comment.votes).toBe(1);
    });
    test('Test cannot reply to resolved comment', () => {
        comment.addReply('reply');
        expect(comment.replies.length).toBe(0);
    });
})
