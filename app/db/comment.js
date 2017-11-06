module.exports = (function() {
    let mongoose = require('mongoose');

    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        resolved: { type: Boolean, default: false },
        replies: [String],
        votes: { type: Number, default: 0 }
    });

    /*
    * Functionality:
    *   - inserts a new Comment object into our database
    * Usage:
    *   Comment.insert("comment_text", (newComment) => {
    *       console.log(newComment);
    *   });
    * Returns:
    *   - the actual Comment mongoDB object
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

    commentSchema.methods.addReply = function(text) {
        if(this.resolved) {
            return;
        }
        this.replies.push(text);
    }

    /*
    * Functionality:
    *   - increments a particular comment's vote count
    * Usage:
    *   someCommentObj.upvote();
    * Returns:
    *   - nothing
    */
    commentSchema.methods.upvote = function() {
        if(this.resolved) {
            return;
        }
        this.votes++;
    }

    commentSchema.methods.resolve = function() {
        this.resolved = true
    }

    let Comment = mongoose.model('Comment', commentSchema);
    return Comment;
}());