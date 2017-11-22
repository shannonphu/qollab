/**
 * @module Mongoose Model for user
 */

module.exports = (function () {
    let mongoose = require('mongoose');

    var userSchema = new mongoose.Schema();

    /*
    * Functionality:
    *   - inserts a new User object into our database
    * Usage:
    *   User.insert((newUser) => {
    *       console.log(newUser);
    *   });
    * Returns:
    *   - the actual User mongoDB model
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
