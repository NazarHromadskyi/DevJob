const { positionService } = require('../services');
const { statusCodesEnum } = require('../constants');

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
      const item = await positionService.create(req.body);

      res.statusCodesEnum.CREATED.json(item);
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

      res.sendStatus(statusCodesEnum.DELETED);
    } catch (e) {
      next(e);
    }
  },
};
