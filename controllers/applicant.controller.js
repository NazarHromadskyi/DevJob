const { applicantService } = require('../services');
const { statusCodesEnum } = require('../constants');

module.exports = {
  create: async (req, res, next) => {
    try {
      const item = await applicantService.create(req.body);

      res.json(item);
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const {
        params: { applicantId },
        body,
      } = req;
      const item = await applicantService.update(applicantId, body);

      res.json(item);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { applicantId } = req.params;
      await applicantService.delete(applicantId);

      res.sendStatus(statusCodesEnum.DELETED);
    } catch (e) {
      next(e);
    }
  },
};
