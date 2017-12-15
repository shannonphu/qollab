/**
 * Mongoose Model for user
 * @module userSchema
 */

module.exports = (function () {
    let mongoose = require('mongoose');

    /**
     * @memberof module:commentSchema
     */
    var userSchema = new mongoose.Schema({
        lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', unique: true }],
        googleID: { type: String, unique: true, required: true }
    });

    /**
     * @summary inserts a new User object into our database
     * @param {function} callback to execute after inserting user into database
     * @returns {Object} The atual user mongoDB object
     * @memberof module:userSchema
     * @example
     * User.insert((newUser) => {
     *      console.log(newUser);
     * });
     */
    userSchema.statics.insert = function (googleID, callback) {
        let user = new User({ googleID: googleID });
        user.save(function (err, data) {
            if (err) {
                throw err;
            }

            if (callback) {
                callback(user);
            }
        });
    }

    /**
     * @summary find User by googleID
     * @param {String} googleID the googleID associated with the user
     * @param {function} callback the callback function to execute after the DB query
     * @memberof module:userSchema
     */
    userSchema.statics.findByGoogleID = (googleID, callback) => {
        User.findOne({ 'googleID': googleID })
            .populate('lectures')
            .exec(function (err, user) {
                if (err) {
                    throw err;
                }

                if (callback) {
                    callback(user);
                }
            });
    }

    /**
     * @summary inserts an ID of a lecture object into this user
     * @param {Lecture} lecture object to insert into user
     * @param {function} callback to execute after inserting lecture into user
     * @returns {User} The atual user mongoDB object
     * @memberof module:userSchema
     * @example
     * instructor.addLecture(newLecture, (updatedInstructor) => {
     * 
     * });
     */
    userSchema.statics.addLecture = function (id, lecture, callback) {
        User.findOneAndUpdate(
            { "_id": id },
            { $push: { "lectures": lecture._id } },
            { safe: true, upsert: true, new: true },
            function (err, user) {
                if (err) {
                    throw err;
                }

                if (callback) {
                    callback(user);
                }
            }
        );
    }

    let User = mongoose.model('User', userSchema);
    return User;
}());
