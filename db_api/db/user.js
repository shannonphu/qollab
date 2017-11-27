/**
 * @module Mongoose Model for user
 */

module.exports = (function () {
    let mongoose = require('mongoose');

    var userSchema = new mongoose.Schema();

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
    userSchema.statics.insert = function (callback) {
        let user = new User();
        user.save(function (err, data) {
            if (err) {
                throw err;
            }

            if (callback) {
                callback(user);
            }
        });
    }

    let User = mongoose.model('User', userSchema);
    return User;
}());
