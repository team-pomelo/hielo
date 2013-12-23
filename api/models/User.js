/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    nickname: {
      type: 'string',
      required: true,
      unique: true,
    },
    email: {
      type: 'string',
      required: true,
      email: true,
      unique: true,
    },
    password: {
      type: 'string',
    },
    toJSON: function() {
      var u = this.toObject();
      // Don't respond with password, ever
      delete u.password;
      return u;
    },
  }
};
