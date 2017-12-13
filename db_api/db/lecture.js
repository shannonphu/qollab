const commentDefinition = require('./comment.js');
const commentSchema = commentDefinition.schema;
const Comment = commentDefinition.model;

module.exports = (function () {
    let mongoose = require('mongoose');

    var lectureSchema = new mongoose.Schema({
        title: { type: String, required: true },
        joinCode: { type: String, required: true, unique: true },
        instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        canvas: String
    });

    /*
    * Functionality:
    *   - inserts a new Lecture object into our database
    * Usage:
    *   Lecture.insert("lecture_title", "instructor_id", (newLecture) => {
    *       console.log(newLecture);
    *   });
    * Returns:
    *   - the actual Lecture mongoDB model
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

    /*
    * Functionality:
    *   - finds the Lecture associated with this join code
    * Usage:
    * Lecture.findByJoinCode(someJoinCode, (lecture) => {
    *    // do something
    });
    * Returns:
    *   - the actual Lecture mongoDB model
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

    /*
    * Functionality:
    *   - return lecture's joincode by objectid
    * Usage:
    * Lecture.getJoinCode(lectureId, (lecture) => {
    *    // do something
    });
    * Returns:
    *   - the joincode of a lecture by its id
    */
    lectureSchema.statics.getJoinCode = (lectureId, callback) => {
        Lecture.findById(lectureId, function (err, lecture) {
            if (err) {
                throw err;
            }

            if (lecture == null) {
                return null;
            }

            if (callback) {
                callback(lecture.joinCode);
            }
            return;
        });
    }

    /**
     * @summary Adds a comment to the lecture object
     * @param {String} Join code for the lecture we want to add the comment to
     * @param {String} Comment text for new comment
     * @param {String} Annotation ID for annotation linked to comment
     * @param {function} Callback method to execute after DB queries
     * @returns {Comment} 
     * @memberof module:lectureDB
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
     * @returns {[Comment]} 
     * @memberof module:lectureDB
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
     * @memberof module:lectureDB
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

    /*
    * Functionality:
    *   - generates a 6 digit numerical code randomly
    */
    let generateCode = function () {
        let code = Math.floor(100000 + Math.random() * 900000);
        return code.toString();
    }

    let Lecture = mongoose.model('Lecture', lectureSchema);
    return Lecture;
}());