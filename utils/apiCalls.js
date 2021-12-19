const axios = require('axios');

// ========== Shared ========== //

// ========== Overview ========== //

const getProductDataByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${product_id}`;
  return axios.get(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    }
  })
  .then((results) => {
    callback(results.data);
  })
  .catch((err) => {
    callback(err);
  })
}
const getReviewsMetaByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${product_id}`;
  axios.get(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    }
  })
  .then((results) => {
    callback(results.data);
  })
  .catch((err) => {
    callback(err);
  })
}

const getProductStylesByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${product_id}/styles`;
  axios.get(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    }
  })
  .then((results) => {
    callback(results.data);
  })
  .catch((err) => {
    callback(err);
  })
}

const addProductToCart = (sku_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart`;
  axios.post(endpoint, {
    headers : {
      // "Authorization" : // put API key from .env here
    },
    'sku_id' : sku_id
  })
  .then((results) => {
    callback();
  })
  .catch((err) => {
    callback(err)
  })
}

module.exports.getProductDataByItem = getProductDataByItem;
module.exports.getReviewsMetaByItem = getReviewsMetaByItem;
module.exports.getProductStylesByItem = getProductStylesByItem;
module.exports.addProductToCart = addProductToCart;

// ========== Related Products ========== //

// ========== Questions & Answers ========== //

const QA_API_KEY = require('../env/config.js').API_KEY;

const getProductQuestionData = (product_id, callback) => {
  let endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id='.concat(product_id);

  return axios.get(endpoint, {
    headers: {
      "Authorization": QA_API_KEY
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports.getProductQuestionData = getProductQuestionData;

// ========== Ratings & Reviews ========== //

//import axios from 'axios';

//changed mine to js as I wanted to use the linter and added it to my gitignore. I can change back to env if that is needed.
// import GITHUB_API_TOKEN from '.././env/config.js';

// let getReviewsByItem = function(productId) {
//   let headerVals = {
//     Authorization: GITHUB_API_TOKEN,
//     count: 20,
//     //I'll probably need to take this in as a param in the future
//     sort: newest
//   };

//   let options = {
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}`,
//     headers: headerVals
//   };

//   axios(options)
//     .then((response) => {
//       callback(null, response.data);
//     })
//     .catch((error) => {
//       callback(error.message);
//     })
// }

// let getReviewsMetaByItem = function(productId) {
//   let headerVals = {
//     Authorization: GITHUB_API_TOKEN,
//   };

//   let options = {
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
//     headers: headerVals
//   };

//   axios(options)
//     .then((response) => {
//       callback(null, response.data);
//     })
//     .catch((error) => {
//       callback(error.message);
//     })
// }

// module.exports = {
//   getReviewsByItem,
//   getReviewsMetaByItem
// }