const express = require('express');
const path = require('path');
//ENV variables are not available by calling process.ENV.(Whatever you names the prop here i.e process.env.API_KEY)
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
