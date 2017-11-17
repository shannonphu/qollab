module.exports = (function() {
    let mongoose = require('mongoose');

    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        resolved: { type: Boolean, default: false },
        replies: [String],
        votes: { type: Number, default: 0 }
    });

    /**
     * @param {string} text - The text of comment
     * @param callback 
     * @return the actual comment mongoDB object
     * Functionality:
     *   - inserts a new Comment object into our database
     * Usage:
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
     * @param text - The text of reply
     * Functionality:
     *      - pushes a reply text to the reply list of the comment
     * Usage:
     *   someCommentObj.addreply();
     */
    commentSchema.methods.addReply = function(text) {
        if(this.resolved) {
            return;
        }
        this.replies.push(text);
    }

    /**
     * Functionality:
     *   - increments a particular comment's vote count
     * Usage:
     *   someCommentObj.upvote();
    */
    commentSchema.methods.upvote = function() {
        if(this.resolved) {
            return;
        }
        this.votes++;
    }

    /**
     * Functionality:
     *      - mark a comment/question as resolved
     * Usage:
     *      somecommentObj.resolve();
     */
    commentSchema.methods.resolve = function() {
        this.resolved = true
    }

    let Comment = mongoose.model('Comment', commentSchema);
    return Comment;
}());