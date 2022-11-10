const { Router } = require('express');

const {
  dbFieldsEnum: {
    _ID,
  },
  searchParamsEnum: {
    PARAMS,
    POSITION_ID,
  },
} = require('../constants');
const { positionController } = require('../controllers');
const {
  commonMiddleware: {
    getItemByParam,
    isItemPresent,
    validateByParam,
  },
} = require('../middlewares');
const { Position } = require('../models');
const { positionValidator } = require('../validators');

const positionRouter = Router();

positionRouter.get('/', positionController.getAll);
positionRouter.post(
  '/',
  validateByParam(positionValidator.createPosition),
  positionController.create,
);

positionRouter.get(
  '/:positionId',
  getItemByParam(Position, POSITION_ID, PARAMS, _ID),
  isItemPresent,
  positionController.getOneById,
);
positionRouter.patch(
  '/:positionId',
  validateByParam(positionValidator.updatePosition),
  getItemByParam(Position, POSITION_ID, PARAMS, _ID),
  isItemPresent,
  positionController.update,
);
positionRouter.delete(
  '/:positionId',
  getItemByParam(Position, POSITION_ID, PARAMS, _ID),
  isItemPresent,
  positionController.delete,
);

module.exports = positionRouter;
