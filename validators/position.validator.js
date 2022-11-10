const Joi = require('joi');

const { categoryEnum, levelEnum } = require('../constants');

const createPosition = Joi.object({
  description: Joi
    .string()
    .trim(),

  category: Joi
    .string()
    .required()
    .lowercase()
    .trim()
    .valid(...Object.values(categoryEnum)),

  company: Joi
    .string()
    .required()
    .trim(),

  level: Joi
    .string()
    .required()
    .lowercase()
    .trim()
    .valid(...Object.values(levelEnum)),

  japaneseRequired: Joi
    .boolean()
    .required(),
});

const updatePosition = Joi.object({
  japaneseRequired: Joi.boolean(),
});

module.exports = {
  createPosition,
  updatePosition,
};
