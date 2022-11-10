const express = require('express');
const mongoose = require('mongoose');

const {
  config: {
    PORT,
    MONGO_URL,
  },
} = require('./configs');
const { mainErrorHandler } = require('./errors');
const { applicantRouter, positionRouter } = require('./routes');
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

app.listen(PORT, async () => {
  try {
    console.log(`App listen: ${PORT}`);

    await mongoose.connect(MONGO_URL);
  } catch (e) {
    console.log(e);
  }
});
