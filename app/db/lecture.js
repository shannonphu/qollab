module.exports = (function() {
    let mongoose = require('mongoose');

    var lectureSchema = new mongoose.Schema({
        title: { type: String, required: true },
        joinCode: { type: String, required: true }
    });

    /*
    * Functionality:
    *   - inserts a new Lecture object into our database
    * Usage:
    *   Lecture.insert("lecture_title", (newLecture) => {
    *       console.log(newLecture);
    *   });
    * Returns:
    *   - the actual Lecture mongoDB model
    */
    lectureSchema.statics.insert = function(title, callback) {
        // TODO: check if a lecture already has this code
        let code = generateCode();

        let lecture = new Lecture({title: title, joinCode: code});
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
    lectureSchema.statics.findByJoinCode = function(joinCode, callback) {
        Lecture.findOne({ joinCode: joinCode }, function(err, lecture) {
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
    *   - generates a 6 digit numerical code randomly
    */
    let generateCode = function() {
        let code = Math.floor(100000 + Math.random() * 900000);
        return code.toString();
    }

    let Lecture = mongoose.model('Lecture', lectureSchema);
    return Lecture;
}());