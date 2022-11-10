const { statusCodesEnum } = require('../constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res
    .status(err.status || statusCodesEnum.SERVER_ERROR)
    .json({
      message: err.message || 'Server error',
    });
};
