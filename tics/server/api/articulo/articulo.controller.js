'use strict';

var _ = require('lodash');
var Articulo = require('./articulo.model');

// Get list of articulos
exports.index = function(req, res) {
  Articulo.find(function (err, articulos) {
    if(err) { return handleError(res, err); }
    return res.json(200, articulos);
  });
};

// Get a single articulo
exports.show = function(req, res) {
  Articulo.findById(req.params.id, function (err, articulo) {
    if(err) { return handleError(res, err); }
    if(!articulo) { return res.send(404); }
    return res.json(articulo);
  });
  
};

exports.encontrar = function(req, res) {
  console.log('---------------------------------------');
  console.log(req);
  Articulo.findById(req, function (err, articulo) {
      console.log('---------------------------------------');
  console.log(res);
    if(err) { return handleError(res, err); }
    if(!articulo) { return res.send(404); }
    return res.json(articulo);
  });
  
};

// Creates a new articulo in the DB.
exports.create = function(req, res) {
  console.log(req.headers.authorization);
  Articulo.create(req.body, function(err, articulo) {
    if(err) { return handleError(res, err); }
    return res.json(201, articulo);
  });
};

// Updates an existing articulo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Articulo.findById(req.params.id, function (err, articulo) {
    if (err) { return handleError(res, err); }
    if(!articulo) { return res.send(404); }
    var updated = _.merge(articulo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, articulo);
    });
  });
};

exports.prestado = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Articulo.findById(req.params.id, function (err, articulo) {
    if (err) { return handleError(res, err); }
    if(!articulo) { return res.send(404); }
    articulo.disponible = false;
    articulo.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, articulo);
    });
  });
};

// Deletes a articulo from the DB.
exports.destroy = function(req, res) {
  Articulo.findById(req.params.id, function (err, articulo) {
    if(err) { return handleError(res, err); }
    if(!articulo) { return res.send(404); }
    articulo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}