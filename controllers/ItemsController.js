let Item = require('../models/items');

let ObjectId = require('mongodb').ObjectId

function addItem (newItem) {
  let p = new Promise( (resolve, reject) => {
    Item.create(newItem)
      .then( (doc) => {
        resolve({status: 'success', data: doc});
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
        resolve({status: 'success', data: doc});
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function getAllItems() {
  let p = new Promise( (resolve, reject) => {
    Item.find({})
      .then( (docs) => {
        resolve({ status: 'success', data: docs });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function findById(id) {
  let p = new Promise( (resolve, reject) => {
    Item.findById(id)
      .then( (doc) => {
        resolve({ status: 'succcess', data: doc})
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function decreaseInventoryForItem(id, quantity) {
  let p = new Promise( (resolve, reject) => {
    Item.findById(id)
      .then( (doc) => {
        console.log(`Found item for decrease: ${doc}`)
        // decrease quantity of item
        doc.quantity = doc.quantity - quantity;
        doc.save()
          .then( (doc) => {
            resolve({status: 'success', data: doc});
          })
          .catch( (err) => {
            reject(err)
          })
      })
  })

  return p;
}

function updateItem(id, quantity, description, cost) {
  let p = new Promise( (resolve, reject) => {
    Item.findById(id)
      .then( (doc) => {
        doc.quantity = quantity;
        doc.description = description;
        doc.cost = cost;
        doc.save()
        .then( (doc) => {
          resolve(doc);
        })
        .catch( (err) => {
          reject(err)
        })
      })
  })

  return p;
}

let ItemsController = {
  addItem: addItem,
  deleteAllItems: deleteAllItems,
  getAllItems: getAllItems,
  findById: findById,
  decreaseInventoryForItem: decreaseInventoryForItem,
  updateItem: updateItem
}

module.exports = ItemsController;
