let request = require('supertest');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let ItemsController = require('../controllers/ItemsController/');
let PurchasesController = require('../controllers/PurchasesController/');

let url='mongodb://localhost:27017/vending-machine-project';
mongoose.connect(url,
                 {useMongoClient: true},
                 (err)=> {
                   if(err) throw err;
                   else {console.log('connection to db successful');}
                 });

beforeAll( (done) => {
  return ItemsController.deleteAllItems({})
    .then( (data) => {
      done();
    })
})

describe('Purcahses Controller Tests', () => {
    test("Get total money", function(done) {
       return PurchasesController.getTotalMoney()
        .then( (result) => {
          expect(result.status).toBe('success');
          done();
        })
        .catch( (err) => {
          throw err;
        })
    });

    test("Get all purchases", function(done) {
      return PurchasesController.getAllPurchases()
        .then( (result) => {
          expect(result.status).toBe('success');
          done();
        })
        .catch( (err) => {
          throw err;
        })
    });

    test("Add one purchase", function(done) {
      return PurchasesController.addPurchase({
            description: 'chair',
            date_time: Date(),
            quantity: 100,
            cost: 32})
        .then( (result) => {
          expect(result.status).toBe('success');
          done();
        })
        .catch( (err) => {
          throw err;
        })
    })
})
