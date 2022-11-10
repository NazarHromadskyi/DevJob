const { statusCodesEnum, emailActionEnum } = require('../constants');
const { Position } = require('../models');
const { applicantService, emailService } = require('../services');
const { subscriptionUtil: { findMatches } } = require('../utils');

module.exports = {
  create: async (req, res, next) => {
    try {
      const item = await applicantService.create(req.body);
      const {
        categories,
        email,
        japaneseKnowledge,
        level,
      } = item;

      const positions = await findMatches(
        Position,
        {
          category: categories,
          japanese: japaneseKnowledge,
          level,
        },
      );

      await emailService.sendEmail(
        email,
        emailActionEnum.APPLICANT_CREATED,
        { email, positions },
      );

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
      const {
        categories,
        email,
        japaneseKnowledge,
        level,
      } = item;

      const positions = await findMatches(
        Position,
        {
          category: categories,
          japanese: japaneseKnowledge,
          level,
        },
      );

      await emailService.sendEmail(
        email,
        emailActionEnum.APPLICANT_UPDATED,
        { email, positions },
      );

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
