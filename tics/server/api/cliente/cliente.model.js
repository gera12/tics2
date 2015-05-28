'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClienteSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  email: { type: String, lowercase: true },
  password: String,
  role: {
    type: String,
    default: 'user'
  },
  prestamos: [{ type: Schema.Types.ObjectId, ref: 'Articulo' }]
});

module.exports = mongoose.model('Cliente', ClienteSchema);