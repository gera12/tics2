'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _=require('lodash');
var articulo = require('../articulo/articulo.controller');

var validationError = function(res, err) {
 return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User
    .find({}, '-salt -hashedPassword', function (err, users) {
      if(err) return res.send(500, err);
      //res.json(200, users);
    })
    .populate('prestamos')
        .exec(function(err,user){
          if (err) return handleError(err);
          res.json(200, user);
        });
     
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
     
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.addBook = function (req, res) {
  var userId = req.user._id;
  //console.log(req.headers.authorization);
  User.findById(userId, function (err, user) {
    if (err) return validationError(res, err); 
    else {
     //articulo.encontrar(req.body._id, function (err, articulo){
        
       // if (articulo.disponible==true)
        //{
          console.log('------------------------')
          console.log(req.body._id);
          user.prestamos.push(req.body._id)
              //_.uniq(user.prestamos);n
              user.save(function(err, user){
                if (err) return validationError(res, err);
              });
          User
               .findOne({name:user.name})
               .populate('prestamos')
               .exec(function(err,user){
                 if (err) return handleError(err);

          })
        //}
//else
     


     // })

          
     
    }
  });

};

exports.deleteBook = function (req, res) {
  var userId = req.user._id;
  //console.log(req.headers.authorization);
  User.findById(userId, function (err, user) {
    if (err) return validationError(res, err); 
    else {

          console.log('------------------------')
          console.log(req.body._id);
          user.prestamos.pop(req.body._id)
              //_.uniq(user.prestamos);n
              user.save(function(err, user){
                if (err) return validationError(res, err);
              });
              res.json(user);
    }
  });

};



/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User
  .findOne({
      _id: userId
    }, '-salt -hashedPassword', function(err, user)
    {if (err) return next(err);
     if (!user) return res.json(401);

    }
    ) // don't ever give out the password or salt
    .populate('prestamos')
    .exec(function(err,user){
      if (err) return handleError(err);
     res.json(user);
  });

};
/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
