/**
 * @file 
 * @module commentSchema
 */
module.exports = (function () {
    let mongoose = require('mongoose');

    /**
     * The db schema for comment
     * @memberof module:commentSchema
     */
    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        annotation: { type: String, default: null },
        resolved: { type: Boolean, default: false },
        replies: [String],
        votes: { type: Number, default: 0 }
    });

    /**
     * @summary create a comment with annotation
     * @param {String} text the comment text
     * @param {String} annotation the associated annotation
     * @returns {Comment} the new comment
     * @memberof module:commentSchema
     */
    commentSchema.statics.create = (text, annotation) => {
        let comment = new Comment({
            text: text,
            annotation: annotation
        });

        return comment;
    }

    /**
     * @summary inserts a new Comment object into our database
     * @param {String} text the Comment text
     * @param {String} annotation the associated annotation
     * @param {function} callback the callback function after DB query
     * @returns {Comment} the actual Comment mongoDB object
     * @memberof module:commentSchema
     * @example
     * Comment.insert("comment_text", annotationJSON, (newComment) => {
     *       console.log(newComment);
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

    /**
     * @summary get Comment object by its ID
     * @param {String} id the Comment id associated with the wanted object
     * @param {function} callback the callback function to execute after DB queries
     * @memberof module:commentSchema
     * @example
     * Comment.getByID(commentId, (comment) => {}
     * 
     * });
     */
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
     * @param {String} id the comment's ID that we want to reply to
     * @param {String} text the reply text
     * @param {function} callback to execute after replying to the comment
     * @returns {Comment} comment just upvoted
     * @memberof module:commentSchema
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
     * @memberof module:commentSchema
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
     * @memberof module:commentSchema
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