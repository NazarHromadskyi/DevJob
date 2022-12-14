const { searchParamsEnum, statusCodesEnum } = require('../constants');
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
        throw new ApiError('Item not found', statusCodesEnum.NOT_FOUND);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateByParam: (
    validator,
    searchIn = searchParamsEnum.BODY,
    mutate = searchIn,
  ) => (req, res, next) => {
    try {
      const { error, value } = validator.validate(req[searchIn]);

      if (error) {
        throw new ApiError(error.details[0].message, statusCodesEnum.BAD_REQUEST);
      }

      req[mutate] = value;
      next();
    } catch (e) {
      next(e);
    }
  },
};
