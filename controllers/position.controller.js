const { positionService, applicantService, emailService } = require('../services');
const { statusCodesEnum, emailActionEnum } = require('../constants');
const { Applicant } = require('../models');

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
      const {
        description,
        category,
        company,
        japaneseRequired,
        level,
      } = item;
      let japanese;
      japaneseRequired ? japanese = 'required' : japanese = 'not required';
      // const filterObject = {};
      // let japaneseSearchIn;
      // japaneseRequired ? japaneseSearchIn = [true] : japaneseSearchIn = [true, false];
      // Object.assign(filterObject, {
      //   $and: [
      //     { categories: { $in: category } },
      //     { level: { $eq: level } },
      //     { japaneseKnowledge: { $in: japaneseSearchIn } },
      //   ],
      // });
      //
      // const applications = await Applicant.find(filterObject);
      // console.log(applications);

      await emailService.sendEmail(
        'cyberng0409@gmail.com',
        emailActionEnum.POSITION_CREATED,
        {
          category, description, company, japaneseRequired: japanese, level,
        },
      );

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
      const { positionId } = req.params;
      await positionService.deleteById(positionId);

      res.sendStatus(statusCodesEnum.DELETED);
    } catch (e) {
      next(e);
    }
  },
};
