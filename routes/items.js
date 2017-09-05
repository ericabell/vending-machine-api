var express = require('express');
var router = express.Router();

let ItemsController = require('../controllers/ItemsController');

// ITEMS ROUTES

router.get('/customer/items', function(req, res, next) {
  ItemsController.getAllItems()
    .then( (docs) => {
      res.json(docs);
    })
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
})

module.exports = router;
