const express = require('express');
const mongoose = require('mongoose');
const { applicantRouter, positionRouter } = require('./routes');
const { mainErrorHandler } = require('./errors');
const {
  config: {
    PORT,
    MONGO_URL,
  },
} = require('./configs');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/applicants', applicantRouter);
app.use('/positions', positionRouter);

app.use('*', (req, res, next) => {
  next(new Error('Route doesn\'t exist'));
});

app.use(mainErrorHandler);

app.listen(PORT, () => {
  console.log(`App listen: ${PORT}`);

  mongoose.connect(MONGO_URL);
});
