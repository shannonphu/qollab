/**
 * @file
 * @module lectureSchema
 */
const commentDefinition = require('./comment.js');
const commentSchema = commentDefinition.schema;
const Comment = commentDefinition.model;

module.exports = (function () {
    let mongoose = require('mongoose');

    /**
     * The db schema for lecture
     * @memberof module:lectureSchema
     */
    var lectureSchema = new mongoose.Schema({
        title: { type: String, required: true },
        joinCode: { type: String, required: true, unique: true },
        instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        canvas: String
    });
    
    /**
     * @summary inserts a new Lecture object into our database
     * @param {String} title the title of the lecture
     * @param {String} instructorId the instructor id
     * @param {function} callback the callback function to execute after the DB query
     * @returns {Lecture} the actual Lecture mongoDB model
     * @memberof module:lectureSchema
     * @example Lecture.insert("lecture_title", "instructor_id", (newLecture) => {
     *       console.log(newLecture);
     * });
     */
    lectureSchema.statics.insert = function (title, instructorId, callback) {
        // TODO: check if a lecture already has this code
        let code = generateCode();

        let lecture = new Lecture({ title: title, joinCode: code, instructor: instructorId });
        lecture.save(function (err, data) {
            if (err) {
                throw err;
            }

            if (callback) {
                callback(data);
            }
            return;
        });
    }

    /**
     * @summary finds the Lecture associated with this join code
     * @param {String} joinCode the join code associated with the lecture
     * @param {function} callback method to execute after the DB query
     * @returns {Lecture} the actual Lecture mongoDB model
     * @memberof module:lectureSchema
     * @example Lecture.findByJoinCode(someJoinCode, (lecture) => {
     *    // do something
     * });
     */
    lectureSchema.statics.findByJoinCode = function (joinCode, callback) {
        Lecture.findOne({ joinCode: joinCode }, function (err, lecture) {
            if (err) {
                throw err;
            }

            if (lecture == null) {
                return null;
            }

            if (callback) {
                callback(lecture);
            }
            return;
        });
    }

    /**
     * @summary Adds a comment to the lecture object
     * @param {String} joinCode code for the lecture we want to add the comment to
     * @param {String} commentText text for new comment
     * @param {String} annotation ID for annotation linked to comment
     * @param {function} callback method to execute after DB queries
     * @returns {Comment} 
     * @memberof module:lectureSchema
     * @example
     * Lecture.addComment("join_code", "comment_text", "annotation_id", (comment) => {
     * 
     * });
     */
    lectureSchema.statics.addComment = (joinCode, commentText, annotation, callback) => {
        Comment.insert(commentText, annotation, (comment) => {
            Lecture.findOneAndUpdate(
                { "joinCode": joinCode },
                { "$push": { "comments": comment._id } },
                { safe: true, upsert: true, new: true },
                (err, lecture) => {
                    if (callback) {
                        callback(comment);
                    }
                });
        });
    }

    /**
     * @summary Gets all comments in this lecture
     * @param {String} Join code for the lecture we want to add the comment to
     * @param {function} Callback method to execute after DB queries
     * @returns {Comment} 
     * @memberof module:lectureSchema
     * @example
     * Lecture.getComments("join_code", (comments) => {
     * 
     * });
     */
    lectureSchema.statics.getComments = (joinCode, callback) => {
        Lecture.findOne({ "joinCode": joinCode })
            .populate('comments')
            .exec(function (err, lecture) {
                if (err) {
                    throw err;
                }

                if (callback) {
                    callback(lecture.comments);
                }
            });
    }

    /**
     * @summary Sets canvas JSON string when canvas updated
     * @param {String} Join code for the lecture we want to add the comment to
     * @param {String} JSON string representing canvas
     * @param {function} Callback method to execute after setting canvas
     * @returns {Lecture} 
     * @memberof module:lectureSchema
     * @example
     * Lecture.setCanvas("join_code", "{}", (lecture) => {
     * 
     * });
     */
    lectureSchema.statics.setCanvas = (joinCode, canvasJSON, callback) => {
        Lecture.findOneAndUpdate(
            { "joinCode": joinCode },
            { "$set": { "canvas": canvasJSON } },
            { safe: true, upsert: true, new: true },
            (err, lecture) => {
                if (err) {
                    throw err;
                }
                
                if (callback) {
                    callback(lecture);
                }
            });
    }

    /**
     * @summary generates a 6 digit numerical code randomly
     * @memberof module:lectureSchema
     */
    let generateCode = function () {
        let code = Math.floor(100000 + Math.random() * 900000);
        return code.toString();
    }

    let Lecture = mongoose.model('Lecture', lectureSchema);
    return Lecture;
}());