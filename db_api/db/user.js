/**
 * Mongoose Model for user
 * @module userDB
 */

module.exports = (function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    var userSchema = new Schema();

    let User = mongoose.model('User', userSchema);
    return User;
}());
