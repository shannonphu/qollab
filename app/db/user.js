/**
 * @module Mongoose Model for user
 */

module.exports = (function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    var userSchema = new Schema({
        _lectureJoinCode: { type: String, default: '' }
    });

    //  Virtual getter / setter with a more convenient name
    userSchema.virtual('joinCode').get(function () {
        return this._lectureJoinCode;
    }).set(function (joinCode) {
        this._lectureJoinCode = joinCode;
    });

    let User = mongoose.model('User', userSchema);
    return User;
}());
