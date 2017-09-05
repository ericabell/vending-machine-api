let request = require('supertest');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let ItemsController = require('../controllers/ItemsController/');

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

describe('Items Controller Tests', () => {
    test("Add an Item", function(done) {
        let description = 'water bottle';
        let cost = 10;
        let quantity = 5;
       return ItemsController.addItem({description: description,
                              cost: cost,
                              quantity: quantity
                            })
        .then( (data) => {
          expect(data.description === description).toBeTruthy();
          expect(data.cost === cost).toBeTruthy();
          expect(data.quantity === quantity).toBeTruthy();
          done();
        })
        .catch( (err) => {
          throw err;
        })
    });

    // test("Get List of All Items", function(done) {
    //
    // })
})
