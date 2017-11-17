/**
 * Module for comment mongo DB object
 * @module commentDB
 */
module.exports = (function() {
    let mongoose = require('mongoose');

    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        resolved: { type: Boolean, default: false },
        replies: [String],
        votes: { type: Number, default: 0 }
    });

    /**
     * @summary inserts a new Comment object into our database and returns the actual comment mongo DB object
     * @callback requestCallback
     * @param {String} text - The text of comment
     * @param {requestCallback} callback - The callback function
     * @memberof module:commentDB
     * @example
     *   Comment.insert("comment_text", (newComment) => {
     *       console.log(newComment);
     *   });
     */
    commentSchema.statics.insert = function(text, callback) {
        let comment = new Comment({text: text});
        comment.save(function (err, data) {
            if (err) {
                throw err;
            }
            
            if (callback) {
                callback(comment);
            }
        
            return;
        });
    }

    /**
     * @summary pushes a reply text to the reply list of the comment
     * @param {String} text - The text of reply
     * @memberof module:commentDB
     * @example
     *   someCommentObj.addreply();
     */
    commentSchema.methods.addReply = function(text) {
        if(this.resolved) {
            return;
        }
        this.replies.push(text);
    }

    /**
     * @summary increments a particular comment's vote count
     * @memberof module:commentDB
     * @example
     *   someCommentObj.upvote();
    */
    commentSchema.methods.upvote = function() {
        if(this.resolved) {
            return;
        }
        this.votes++;
    }

    /**
     * @summary mark a comment/question as resolved
     * @memberof module:commentDB
     * @example
     *      somecommentObj.resolve();
     */
    commentSchema.methods.resolve = function() {
        this.resolved = true
    }

    let Comment = mongoose.model('Comment', commentSchema);
    return Comment;
}());