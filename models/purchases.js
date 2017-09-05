const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const purchaseSchema = new mongoose.Schema({
  description: String,
  date_time: Date,
  quantity: Number,
  cost: Number
}, {collection: 'purchases'});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
