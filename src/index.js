const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost/mini-twitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Server running on http://localhost:3333");
});
