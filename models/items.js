const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const itemSchema = new mongoose.Schema({
  description: String,
  cost: Number,
  quantity: Number,
}, {collection: 'items'});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
