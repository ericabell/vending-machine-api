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
  console.log(`In getTotalMoney`);
  let p = new Promise( (resolve, reject) => {
    Purchase.find({})
    .then( (docs) => {
      let total = 0;
      docs.forEach( (doc) => {
        total += doc.cost;
      })
      console.log(`sum result: total`);
      resolve({status: 'success', data: total});
    })
    .catch( (err) => {
      console.log(err);
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
