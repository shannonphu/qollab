/**
 * @module Mongoose Model for user
 */

module.exports = (function () {
    let mongoose = require('mongoose');

    var userSchema = new mongoose.Schema({
        lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', unique: true }],
        googleID: { type: String, unique: true, required: true }
    });

    /**
     * @summary inserts a new User object into our database
     * @param {function} callback to execute after inserting user into database
     * @returns {Object} The atual user mongoDB object
     * @memberof module:userDB
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

    userSchema.statics.findByGoogleID = (googleID) => {
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
     * @memberof module:userDB
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

    /**
     * @summary retrieves all lecture objects belonging to this user
     * @param {function} callback to execute after getting all lecture objects
     * @returns {[Lecture]} array of lectures belonging to this user
     * @memberof module:userDB
     * @example
     * instructor.getLectures((lectures) => {
     * 
     * });
     */
    userSchema.methods.getLectures = function (callback) {
        User.findOne({ _id: this._id })
            .populate('lectures')
            .exec(function (err, lectures) {
                if (err) {
                    throw err;
                }

                if (callback) {
                    callback(lectures);
                }
            });
    }

    let User = mongoose.model('User', userSchema);
    return User;
}());
