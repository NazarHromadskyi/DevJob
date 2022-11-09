const { positionService } = require('../services');
const { statusCode } = require('../constants');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const items = await positionService.getAll();

      res.json(items);
    } catch (e) {
      next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      const createdItem = await positionService.create(req.body);

      res.json(createdItem);
    } catch (e) {
      next(e);
    }
  },

  getOneById: async (req, res, next) => {
    try {
      const { item } = req;

      res.json(item);
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const {
        params: { positionId },
        body,
      } = req;
      const item = await positionService.updateById(positionId, body);

      res.json(item);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { positionId } = req.params;
      await positionService.deleteById(positionId);

      res.status(statusCode.DELETED).json('Item deleted');
    } catch (e) {
      next(e);
    }
  },
};
