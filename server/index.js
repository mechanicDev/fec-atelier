const express = require('express');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const port = 3000;

const apiCalls = require('../utils/apiCalls.js');
const rp = require('../utils/relatedProducts/serverHelpers');

app.use(compression({level: 1}));
app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ========== Shared ========== //

app.post('/interactions', (req, res) => {
  let metrics = req.body;
  apiCalls.addInteraction(metrics, response => {
    res.send(response);
  })
})

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

app.post('/cart', (req, res) => {
  apiCalls.addProductToCart(req.body.sku_id, (result) => {
    res.send(result);
  })
})

// ========== Related Products ========== //

//Related Products
app.get('/relatedItems', (req, res) => {
  let item_id = req.query.item_id;

  // get the related item IDs
  rp.getRelatedItems(item_id)

    // Get the item details of all related items in the array
    .then(relatedItems => rp.getSingleItemDetails(relatedItems)

    // Get the images for the styles
    .then(items => {
      rp.getRelatedImages(items)
      .then(productArray => {
        res.status(200).send(productArray);
      })
    })
    .catch(e=>e)
    )
    .catch(e => e);
});

// ========== Outfit ========== //

app.get('/outfit', (req,res) => {
  console.log('This is the outfit at the server: ', req.query)
  if (!req.query.outfit) {
    console.log('No outfit yet')
    res.end();
  } else {
    let outfit = req.query.outfit;
    console.log('Outfit inside the else: ', outfit)
    rp.getSingleItemDetails(outfit)
      .then(results => {
        console.log('Results here: ', results)
      })
      .catch(e => console.log("oops"))

  }
})

// ========== Questions & Answers ========== //

app.get('/qa/questions/:product_id/:page', function(req, res) {
  let product = req.params.product_id;
  let page = req.params.page;
  res.set('Accept-Encoding', 'gzip');
  apiCalls.getProductQuestionData(product, page, questions => {
    res.send(questions);
  })
})

app.put('/qa/questions/:question_id/helpful', function(req, res) {
  let question = req.params.question_id;
  apiCalls.markQuestionHelpful(question, response => {
    res.send(response);
  })
})

app.put('/qa/answers/:answer_id/helpful', function(req, res) {
  let answer = req.params.answer_id;
  apiCalls.markAnswerHelpful(answer, response => {
    res.send(response);
  })
})

app.put('/qa/answers/:answer_id/report', function(req, res) {
  let answer = req.params.answer_id;
  apiCalls.reportAnswer(answer, response => {
    res.send(response);
  })
})

app.post('/qa/question/:question_id/answers', function(req, res) {
  let question_id = req.params.question_id;
  let answer = req.body;
  apiCalls.submitAnswer(question_id, answer, response => {
    res.send(response);
  })
})

app.post('/qa/questions', function(req, res) {
  let question = req.body;
  apiCalls.submitQuestion(question, response => {
    res.send(response);
  })
})

// ========== Ratings & Reviews ========== //

app.get('/ratings', function(req, res, next) {

  apiCalls.getReviewsByItem(req.headers.item_id, req.headers.sort, req.headers.count, (err, results) => {
    if (err) {
      console.log('error at server ratings retrieve: ', err.message);
    } else {
      let ratings = results.data.results;
      res.send(ratings);
    }
  })
})

app.get('/reviews/meta', (req, res, next) => {
  apiCalls.getReviewsMetaByItem(req.headers.item_id, (err, results) => {
    res.send(results);
  })
})

app.post('/reviews/meta', (req, res) => {
  let product = req.body.data.product_id;
  apiCalls.getReviewsForOverview(product, (reviewsData) => {
    res.send(reviewsData);
  })
})

app.put('/reviews/mark_helpful', (req, res, next) => {
  apiCalls.putMarkReviewHelpful(req.body.data.review_id, (err, results) => {
    res.send(results);
  })
})

app.post('/reviews/question/new_review', function(req, res, next) {
  let newReview = req.body.data;
  apiCalls.newReview(newReview, response => {
    res.send(response);
  })
})

// ========== Server Listen ========== //

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
