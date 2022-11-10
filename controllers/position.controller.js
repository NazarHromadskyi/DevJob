const { statusCodesEnum, emailActionEnum } = require('../constants');
const { Applicant } = require('../models');
const { positionService, emailService } = require('../services');
const { subscriptionUtil: { findMatches } } = require('../utils');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const items = await positionService.getAll(req.query);

      res.json(items);
    } catch (e) {
      next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      const item = await positionService.create(req.body);
      const {
        description,
        category,
        company,
        japaneseRequired,
        level,
      } = item;
      let japaneseNormalized;

      japaneseRequired ? japaneseNormalized = 'required' : japaneseNormalized = 'not required';

      const applicants = await findMatches(
        Applicant,
        {
          category,
          level,
          japanese: japaneseRequired,
        },
      );

      applicants.forEach((applicant) => {
        emailService.sendEmail(
          applicant.email,
          emailActionEnum.POSITION_CREATED,
          {
            category,
            description,
            company,
            japaneseRequired: japaneseNormalized,
            level,
          },
        );
      });

      res.status(statusCodesEnum.CREATED).json(item);
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
      const {
        item: {
          description,
          category,
          company,
          japaneseRequired,
          level,
        },
        params: { positionId },
      } = req;
      let japaneseNormalized;

      japaneseRequired ? japaneseNormalized = 'required' : japaneseNormalized = 'not required';

      await positionService.deleteById(positionId);

      const applicants = await findMatches(
        Applicant,
        {
          category,
          level,
          japanese: japaneseRequired,
        },
      );

      applicants.forEach((applicant) => {
        emailService.sendEmail(
          applicant.email,
          emailActionEnum.POSITION_DELETED,
          {
            category,
            description,
            company,
            japaneseRequired: japaneseNormalized,
            level,
          },
        );
      });

      res.sendStatus(statusCodesEnum.DELETED);
    } catch (e) {
      next(e);
    }
  },
};
