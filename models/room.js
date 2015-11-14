'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Room;

let roomSchema = Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
 });

Room = mongoose.model('Room', roomSchema);

module.exports = Room;
