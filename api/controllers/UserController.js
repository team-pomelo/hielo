/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  'new': function(req, res) {
    res.view();
  },

  'create': function(req, res, next) {
    User.create(req.body, function(err, user) {
      if(err) {
        console.dir(err);
        req.session.flash = {error: []};
        e = err['ValidationError']
        for(var k in e) {
          for(var l in e[k]) {
            msg = e[k][l]['message'].split(': "" ');
            req.session.flash.error.push({
              title: msg[0] + ' ' + k + ':',
              message: msg[1].replace('(true)', '')
            });
          }
        }
        console.dir(req.session.flash);
        res.redirect('/user/new');
      }

      res.redirect('/user/show/'+user.id);
    });
  },

  'show': function(req, res, next) {
    User.findOne(req.param('id'), function(err, user) {
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user: user
      });
    });
  },

  'index': function(req, res, next) {
    User.find(function(err, users) {
      if(err) return next(err);
      res.view({
        users: users
      });
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}
};
