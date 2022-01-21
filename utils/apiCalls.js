const axios = require('axios');
// ========== Shared ========== //

const addInteraction = (metrics, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions`;
  return axios.post(endpoint, metrics, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
  .then(res => {
    callback(res.data);
  })
  .catch(err => {
    callback(err);
  });
}

module.exports.addInteraction = addInteraction;

// ========== Overview ========== //

const getProductDataByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${product_id}`;
  return axios.get(endpoint, {
    headers : {
      "Authorization": process.env.API_KEY
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
      "Authorization": process.env.API_KEY
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
      "Authorization": process.env.API_KEY
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

const getReviewsForOverview = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${product_id}`;
  axios.get(endpoint, {
    headers : {
      "Authorization": process.env.API_KEY
    }
  })
  .then((results) => {
    callback(results.data);
  })
  .catch((err) => {
    callback(err);
  })
}

module.exports.getProductDataByItem = getProductDataByItem;
module.exports.getProductStylesByItem = getProductStylesByItem;
module.exports.addProductToCart = addProductToCart;
module.exports.getReviewsForOverview = getReviewsForOverview;

// ========== Related Products ========== //



// ========== Questions & Answers ========== //

const getProductQuestionData = (product_id, page, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${product_id}&page=${page}`;

  return axios.get(endpoint, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
    .then(res => {
      callback(res.data);
    })
    .catch(err => {
      callback(err);
    });
}

const markQuestionHelpful = (question_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${question_id}/helpful`;

  return axios.put(endpoint, {}, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
  .then(res => {
    callback(res);
  })
  .catch(err => {
    callback(err);
  })
}

const markAnswerHelpful = (answer_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answer_id}/helpful`;

  return axios.put(endpoint, {}, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
  .then(res => {
    callback(res);
  })
  .catch(err => {
    callback(err);
  })
}

const reportAnswer = (answer_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answer_id}/report`;

  return axios.put(endpoint, {}, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
  .then(res => {
    callback(res);
  })
  .catch(err => {

    callback(err);
  })
}

const submitAnswer = (question_id, answer, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${question_id}/answers`;

  return axios.post(endpoint, answer, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
  .then(res => {
    callback(res);
  })
  .catch(err => {
    callback(err);
  })
}

const submitQuestion = (question, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions`;
  question.product_id = Number(question.product_id);

  return axios.post(endpoint, question, {
    headers: {
      "Authorization": process.env.API_KEY
    }
  })
  .then(res => {
    callback(res);
  })
  .catch(err => {
    callback(err);
  })
}

module.exports.getProductQuestionData = getProductQuestionData;
module.exports.markQuestionHelpful = markQuestionHelpful;
module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;
module.exports.submitAnswer = submitAnswer;
module.exports.submitQuestion = submitQuestion;

// ========== Ratings & Reviews ========== //

const getReviewsByItem = (product_id, sortOrder, count, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?count=${count}&sort=${sortOrder}&product_id=${product_id}`;

  axios.get(endpoint, {
    headers : {
      Authorization : process.env.API_KEY,
    }
  })
  .then((response) => {
    callback(null, response);
  })
  .catch((error) => {
    console.log('Error fetching the ratings data: ', error)
    callback(error);
  })
}

const getReviewsMetaByItem = (product_id, callback) => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${product_id}`;
  return axios.get(endpoint, {
    headers : {
      "Authorization" : process.env.API_KEY
    }
  })
  .then((response => {
    callback(null, response.data);
  }))
  .catch((err) => {
    console.log('Error fetching the ratings metadata: ', err)
  })
}

const putMarkReviewHelpful = (review_id, callback) => {

  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${review_id}/helpful`;
  return axios.put(endpoint, {}, {
    headers : {
      "Authorization" : process.env.API_KEY
    }
  })
  .then((response => {
    callback(null, response.data);
  }))
  .catch((err) => {
    console.log('Error marking helpful at apicalls: ', err)
  })
}

const newReview = (reviewData, callback) => {

  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`;

  reviewData.product_id = Number(reviewData.product_id);
  reviewData.recommend = Boolean(reviewData.recommend);

  return axios.post(endpoint, reviewData, {
    headers : {
      "Authorization" : process.env.API_KEY
    }
  })
  .then((response => {
    callback(null, response.data);
  }))
  .catch((err) => {
    console.log('Error submitting new review: ', err)
  })
}

module.exports.getReviewsByItem = getReviewsByItem;
module.exports.getReviewsMetaByItem = getReviewsMetaByItem;
module.exports.putMarkReviewHelpful = putMarkReviewHelpful;
module.exports.newReview = newReview;
