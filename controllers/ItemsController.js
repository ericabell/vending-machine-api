let Item = require('../models/items');

let ObjectId = require('mongodb').ObjectId

function addItem (newItem) {
  let p = new Promise( (resolve, reject) => {
    Item.create(newItem)
      .then( (doc) => {
        resolve(doc);
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function deleteAllItems() {
  let p = new Promise( (resolve, reject) => {
    Item.deleteMany()
      .then( (doc) => {
        resolve(doc);
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

let ItemsController = {
  addItem: addItem,
  deleteAllItems: deleteAllItems,

}

module.exports = ItemsController;
