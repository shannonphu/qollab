module.exports = (function () {
    let mongoose = require('mongoose');

    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        annotation: { type: String, default: null },
        resolved: { type: Boolean, default: false },
        replies: [String],
        votes: { type: Number, default: 0 }
    });

    commentSchema.statics.create = (text, annotation) => {
        let comment = new Comment({
            text: text,
            annotation: annotation
        });

        return comment;
    }

    /*
    * Functionality:
    *   - inserts a new Comment object into our database
    * Usage:
    *   Comment.insert("comment_text", annotationJSON, (newComment) => {
    *       console.log(newComment);
    *   });
    * Returns:
    *   - the actual Comment mongoDB object
    */
    commentSchema.statics.insert = function (text, annotation, callback) {
        let comment = Comment.create(text, annotation);
        comment.save(function (err, data) {
            if (err) {
                throw err;
            }

            if (callback) {
                callback(data);
            }
        });
    }

    commentSchema.statics.getByID = function (id, callback) {
        Comment.findById(id, (err, comment) => {
            if (err) {
                throw err;
            }

            if (callback) {
                callback(comment);
            }
        });
    }

    /**
     * @summary adds text reply to comment
     * @param {String} the comment's ID that we want to reply to
     * @param {String} the reply text
     * @param {function} callback to execute after replying to the comment
     * @returns {Comment} comment just upvoted
     * @memberof module:commentDB
     * @example
     * Comment.addReply(commentId, "This is a reply.", (comment) => {
     * 
     * });
     */
    commentSchema.statics.addReply = function (id, text, callback) {
        Comment.findOneAndUpdate(
            { "_id" : id },
            { $push: { "replies": text } },
            { safe: true, upsert: true, new: true },
            function (err, comment) {
                if (err) {
                    throw err;
                }

                if (callback) {
                    callback(comment);
                }
            }
        );
    }

    /**
     * @summary increments the comment's number of votes
     * @param {String} the comment's ID that we want to upvote
     * @param {function} callback to execute after upvoting this comment
     * @returns {Comment} comment just upvoted
     * @memberof module:commentDB
     * @example
     * Comment.upvote(commentId, (comment) => {
     * 
     * });
     */
    commentSchema.statics.upvote = function (id, callback) {
        Comment.findOneAndUpdate(
            { "_id": id },
            { "$inc": { "votes": 1 } },
            { safe: true, upsert: true, new: true },
            (err, comment) => {
                if (err) {
                    throw err;
                }
                
                if (callback) {
                    callback(comment);
                }
            });
    }

    /**
     * @summary sets this comment's resolve flag to true
     * @param {String} the comment's ID that we want to resolve
     * @param {function} callback to execute after resolving this comment
     * @returns {Comment} comment we just resolved
     * @memberof module:commentDB
     * @example
     * Comment.resolve(commentId, (comment) => {
     * 
     * });
     */
    commentSchema.statics.resolve = function (id, callback) {
        Comment.findOneAndUpdate(
            { "_id": id },
            { "$set": { "resolved": true } },
            { safe: true, upsert: true, new: true },
            (err, comment) => {
                if (err) {
                    throw err;
                }

                if (callback) {
                    callback(comment);
                }
            });
    }

    let Comment = mongoose.model('Comment', commentSchema);

    return {
        schema: commentSchema,
        model: Comment
    };
}());