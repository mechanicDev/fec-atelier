const axios = require('axios');
const $ = require('jquery');

// Return an array of related products to a specified product ID //

module.exports.getRelatedItems = id => {
  let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`;

  return axios.get(endpoint, {
    headers: {
      'Authorization': process.env.API_KEY
    }
  })
    .then(result => {
      return result.data;
    }).catch(e => e);
};

// Return the product details of each item

module.exports.getSingleItemDetails = products => {
  console.log('Products: ', products)
  return Promise.all(products.map(id => {
    let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`;
    return axios.get(endpoint, {
      headers: {
        'Authorization': process.env.API_KEY
      }
    })
    .then(result => {
      return result;
    }).catch(e=>e);
  }))
  //End of the promise all
  .then(results => {
    let items = results.map(item => item.data)
    return items
  })
  .catch(e=>e)
}

// Returns and array of the image url for the requested product IDs //

module.exports.getRelatedImages = productArray => {
  return Promise.all(productArray.map(item => {
    let id = item.id;
    let endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`;
    return axios.get(endpoint, {
      headers: {
        'Authorization': process.env.API_KEY
      }
    })
      .then(result => {
        return result;
      }).catch(e => e);
  }))
  //End of the promise all
    .then(values => {
      let styles = values.map(item => {
        return item.data
      })
      for (let i = 0; i < productArray.length ; i++) {
        let currentItem = productArray[i];
        currentItem.thumbnail = styles[i].results[0].photos[0].thumbnail_url;
      }
      return productArray;
    })
    .catch(e=>e);
};
