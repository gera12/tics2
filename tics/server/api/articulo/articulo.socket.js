/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Articulo = require('./articulo.model');

exports.register = function(socket) {
  Articulo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Articulo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('articulo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('articulo:remove', doc);
}