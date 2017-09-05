let Item = require('../models/items');
let Purchase = require('../models/purchases');

let ObjectId = require('mongodb').ObjectId

function addPurchase (newPurchase) {
  let p = new Promise( (resolve, reject) => {
    Purchase.create(newPurchase)
      .then( (doc) => {
        resolve({status: 'success', data: doc});
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}


let PurchasesController = {
  addPurchase: addPurchase,

}

module.exports = PurchasesController;
