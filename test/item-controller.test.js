let request = require('supertest');

const mongoose = require('mongoose');
let ItemsController = require('../ItemsController/');

let url='mongodb://localhost:27017/code-snippet-manager-project';
mongoose.connect(url,
                 {useMongoClient: true},
                 (err)=> {
                   if(err) throw err;
                   else {console.log('connection to db successful');}
                 });

describe('Items Controller Tests', () => {
    test("Add an Item", function() {
      ItemsController.insert({description: 'water bottle',
                              cost: 10,
                              quntity: 5
                            })
        .then( (data) => {
          expect(data).toBeTruthy();
        })
        .catch( (err) => {
          throw err
        })
    });
})
