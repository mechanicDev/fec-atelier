const chai = require('chai')
const assert = chai.assert;
const axios = require('axios');
let server = require('../testServer.js')
expect = chai.expect;
should = chai.should();


// require('dotenv').config();
// import file(s) needed

const getProductDataByItem = require('../../utils/apiCalls.js').getProductDataByItem;
const getProductStylesByItem = require('../../utils/apiCalls.js').getProductStylesByItem;

// console.log(process.env)

describe('Overview', function() {

  describe('Example', function() {

    it('should show a test here', function() {
      var doesThisWork = true;

      expect(doesThisWork).to.equal(true);
    })

  })

  // before each here to grab API data

  // getProductDataByItem(59560)
  // .then((result) => {
  //   // console.log(result.data);
  //   expect(result.data.name).to.equal('YEasy')
  // })

  describe('Gather API data', function() {

    it('should GET (ratings numbers) from Reviews API for StarRating component', function() {
      // logic to check if data is being recieved from reviews API
    })

    it('should GET (name, category and price data) from Products API for StarRating component', function() {
      // logic to check if data is being recieved from products API
    })

    it('should GET (thumbnails) from Products API for StyleSelector component', function() {
      // logic to check if data is being recieved from products API
    })

    it('should GET (image url) from Products API for ImageGallery component', function() {
      // logic to check if data is being recieved from products API
    })

    it('should GET (size count and quantity) from Products API for AddToCart component', function() {
      // logic to check if data is being recieved from products API
    })

    it('should POST Cart data', function() {
      // logic to check if data is being posted to cart API
    })

  })

})