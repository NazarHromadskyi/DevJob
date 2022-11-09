const { searchParamsEnum, statusCode } = require('../constants');
const { ApiError } = require('../errors');

module.exports = {
  getItemByParam: (
    Model,
    paramName,
    searchIn = searchParamsEnum.BODY,
    dbField = paramName,
  ) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      req.item = await Model.findOne({ [dbField]: value });

      next();
    } catch (e) {
      next(e);
    }
  },

  isItemPresent: (req, res, next) => {
    try {
      const { item } = req;

      if (!item) {
        throw new ApiError('Item not found', statusCode.NOT_FOUND);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateByParam: (validator, searchIn = searchParamsEnum.BODY) => (req, res, next) => {
    try {
      const { error, value } = validator.validate(req[searchIn]);

      if (error) {
        throw new ApiError( error.details[0].message, statusCode.BAD_REQUEST);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  },
};
