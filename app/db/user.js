/**
 * @module Mongoose Model for user
 */

module.exports = (function () {
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    var userSchema = new Schema({
        _lectureJoinCode: { type: String, default: '' }
    });


    /**
     * @summary Update the user's join code
     * 
     * <p>
     * Usage: user.updateJoinCode(joinCode, () => {
     *      ... do something ...
     * });
     * </p>
     * 
     * @param   joinCode    the join code for the newly created lecture
     * @param   callback    callback function after successfully updating the user
     * 
     * @returns nothing
     */
    
    userSchema.methods.updateJoinCode = function (joinCode, callback) {
        this.joinCode = joinCode;
        this.save((err) => {
            if (err) {
                throw err;
            }

            if (callback) {
                callback();
            }
        });
    }

    //  Virtual getter / setter with a more convenient name
    userSchema.virtual('joinCode').get(function () {
        return this._lectureJoinCode;
    }).set(function (joinCode) {
        this._lectureJoinCode = joinCode;
    });

    let User = mongoose.model('User', userSchema);
    return User;
}());
