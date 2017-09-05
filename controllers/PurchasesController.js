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


function getAllPurchases() {
  let p = new Promise( (resolve, reject) => {
    Purchase.find({})
      .then( (docs) => {
        resolve({status: 'success', data: docs});
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function getTotalMoney() {
  let p = new Promise( (resolve, reject) => {
    Purchase.aggregate(
      {$match: {}},
      {$sum: cost}
    )
    .then( (doc) => {
      console.log(`sum result: doc`);
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
  getAllPurchases: getAllPurchases,
  getTotalMoney: getTotalMoney,
}

module.exports = PurchasesController;
