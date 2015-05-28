'use strict';

var _ = require('lodash');
var Cliente = require('./cliente.model');

// Get list of clientes
exports.index = function(req, res) {
  Cliente.find(function (err, clientes) {
    if(err) { return handleError(res, err); }
    return res.json(200, clientes);
  });
};

// Get a single cliente
exports.show = function(req, res) {
  Cliente.findById(req.params.id, function (err, cliente) {
    if(err) { return handleError(res, err); }
    if(!cliente) { return res.send(404); }
    return res.json(cliente);
  });
};

// Creates a new cliente in the DB.
exports.create = function(req, res) {
var newCliente = new Cliente(req.body);

  newCliente.save(function(err, cliente) {
    if(err) { return handleError(res, err); }
    return res.json(201, cliente);
  });
};


exports.addBook = function (req, res) {
  var clienteId = req.cliente._id;
  console.log(req.headers.authorization);
  cliente.findById(clienteId, function (err, cliente) {
    if (err) return validationError(res, err); 
    else {
      cliente.prestamos.push(req.body._id);
      _.uniq(cliente.prestamos);
      
      cliente.save(function(err, cliente){
        if (err) return validationError(res, err);
        res.json(cliente);   
      });
    }
  });
};


// Updates an existing cliente in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cliente.findById(req.params.id, function (err, cliente) {
    if (err) { return handleError(res, err); }
    if(!cliente) { return res.send(404); }
    var updated = _.merge(cliente, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cliente);
    });
  });
};

// Deletes a cliente from the DB.
exports.destroy = function(req, res) {
  Cliente.findById(req.params.id, function (err, cliente) {
    if(err) { return handleError(res, err); }
    if(!cliente) { return res.send(404); }
    cliente.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}