module.exports = (function() {
    let mongoose = require('mongoose');

    var lectureSchema = new mongoose.Schema({
        title: { type: String, required: true }
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
        mongoose.connect('mongodb://db_mongo', () => {
            let lecture = new Lecture({title: title});
            lecture.save(function (err, data) {
                if (err) {
                    return console.error(err);
                }
                
                callback(comment);
                return;
            });
        });
    }

    let Lecture = mongoose.model('Lecture', lectureSchema);
    return Lecture;
}());