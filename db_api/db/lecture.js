/**
 * Module for lecture Mongo DB model
 * @module lectureDB
 */
module.exports = (function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;
    let ObjectId = Schema.ObjectId;

    /**
     * @summary lecture schema
     * @var {Schema}
     */
    var lectureSchema = new Schema({
        title: { type: String, required: true },
        joinCode: { type: String, required: true },
        instructor: { type: String, required: true },
        students: [{ type: String }]
    });

    /**
     * @summary inserts a new Lecture object into our database
     * @param {String} title the title of the lecture
     * @param {String} instructorId the identification of the instructor for this lecture
     * @returns {Object} The atual lecture mongoDB model
     * @memberof module:lectureDB
     * @example
     * Lecture.insert("lecture_title", "instructor_id", (newLecture) => {
     *       console.log(newLecture);
     *   });
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
                callback(lecture);
            }
            return;
        });
    }

    /**
     * @summary finds the Lecture associated with this join code
     * @function
     * @memberof module:lectureDB
     * @param {string} joinCode - the joining code for the lecture
     * @returns {Object} - The actual lecture mongoDB model
     * @example
     * Lecture.findByJoinCode(someJoinCode, (lecture) => {
     *    // do something
     });
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
     * @summary generates a 6 digit numerical code randomly
     * @function
     * @memberof module:lectureDB
     * @returns {String} the generated code
     */
    let generateCode = function () {
        let code = Math.floor(100000 + Math.random() * 900000);
        return code.toString();
    }

    let Lecture = mongoose.model('Lecture', lectureSchema);
    return Lecture;
}());
