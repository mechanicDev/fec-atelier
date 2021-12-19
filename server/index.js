const express = require('express');
const path = require('path');
//ENV variables are not available by calling process.ENV.(Whatever you names the prop here i.e process.env.API_KEY)
require('dotenv').config();

const app = express();

const apiCalls = require('../utils/apiCalls.js');

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apiCalls = require('../utils/apiCalls.js');

// ========== Shared ========== //

// ========== Overview ========== //

app.get('/products/:product_id', (req, res) => {
  let product = req.params.product_id;
  apiCalls.getProductDataByItem(product, (data) => {
    res.send(data);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  let product = req.params.product_id;
  apiCalls.getProductStylesByItem(product, (styleData) => {
    res.send(styleData);
  })
})

app.post('/reviews/meta', (req, res) => {
  let product = req.body.data.product_id;
  apiCalls.getReviewsMetaByItem(product, (reviewsData) => {
    res.send(reviewsData);
  })
})
// ========== Related Products ========== //

// ========== Questions & Answers ========== //

app.get('/qa/questions/:product_id', function(req, res) {
  let product = req.params.product_id;

  apiCalls.getProductQuestionData(product, (questions) => {
    res.send(questions);
  })
})

// ========== Ratings & Reviews ========== //

// ========== Server Listen ========== //

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
