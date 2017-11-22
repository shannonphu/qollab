module.exports = (function() {
    let mongoose = require('mongoose');

    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        annotationId: {type: String, default: null },
        resolved: { type: Boolean, default: false },
        replies: [String],
        votes: { type: Number, default: 0 }
    });

    commentSchema.statics.create = (text, annotationId) => {
        let comment = new Comment({
            text: text,
            annotationId: annotationId
        });

        return comment;
    }

    /*
    * Functionality:
    *   - inserts a new Comment object into our database
    * Usage:
    *   Comment.insert("comment_text", "annotation_id", (newComment) => {
    *       console.log(newComment);
    *   });
    * Returns:
    *   - the actual Comment mongoDB object
    */
    commentSchema.statics.insert = function(text, annotationId, callback) {
        let comment = commentSchema.create(text, annotationId);
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
    
    return {
        schema: commentSchema,
        model: Comment
    };
}());