var express = require('express');
var router = express.Router();

let ItemsController = require('../controllers/ItemsController');
let PurchasesController = require('../controllers/PurchasesController');

// ITEMS ROUTES

router.get('/customer/items', function(req, res, next) {
  ItemsController.getAllItems()
    .then( (docs) => {
      res.json(docs);
    })
});

router.post('/customer/items/:itemId/purchases', function(req, res, next) {
  // purchase an item
  // add purchase and subtract from inventory

  // find the itemId
  console.dir(req.body);
  ItemsController.findById(req.params.itemId)
    .then( (doc) => {
      console.log(doc);
      let description = doc.data.description;
      let date_time = new Date();
      let quantity = req.body.quantity;
      let cost = req.body.quantity * doc.data.cost;

      let newPurchase = {description: description,
                         date_time: date_time,
                         quantity: quantity,
                         cost: cost};

      PurchasesController.addPurchase(newPurchase)
        .then( (doc) => {
          console.log(`Purchase made: ${doc}`)
          // subtract quantity from inventory
          ItemsController.decreaseInventoryForItem(req.params.itemId, quantity)
            .then( (doc) => {
              res.json(doc);
            })
        })
    })
});

router.get('/vendor/purchases', function(req, res, next) {
  // get a list of all purchases
  PurchasesController.getAllPurchases()
    .then( (docs) => {
      res.json({status: 'success', data: docs});
    })
});

router.get('/vendor/money', function( req, res, next) {
  // get total amount of money accepted by machine
});

router.post('/vendor/items', function(req, res, next) {
  // get info out of body
  console.dir(req.body);
  let description = req.body.description;
  let cost = req.body.cost;
  let quantity = req.body.quantity;

  let newItem = {
    description: description,
    cost: cost,
    quantity: quantity,
  }

  ItemsController.addItem(newItem)
    .then( (doc) => {
      res.json(doc);
    })
});

router.put('/vendor/items/:itemId', function(req, res, next) {
  // update item quantity
})

module.exports = router;
