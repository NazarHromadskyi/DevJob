const Joi = require('joi');

const {
  categoryEnum,
  levelEnum,
  regexp,
} = require('../constants');

const categoryScheme = Joi.string().trim().lowercase().valid(...Object.values(categoryEnum));

const createApplicant = Joi.object({
  categories: Joi
    .array()
    .items(categoryScheme)
    .required(),

  email: Joi
    .string()
    .regex(regexp.EMAIL)
    .required()
    .trim(),

  level: Joi
    .string()
    .required()
    .trim()
    .lowercase()
    .valid(...Object.values(levelEnum)),

  japaneseKnowledge: Joi
    .boolean()
    .required(),
});

const updateApplicant = Joi.object({
  categories: Joi
    .array()
    .items(categoryScheme),

  email: Joi
    .string()
    .regex(regexp.EMAIL)
    .trim(),

  level: Joi
    .string()
    .trim()
    .lowercase()
    .valid(...Object.values(levelEnum)),

  japaneseKnowledge: Joi.boolean(),
});

module.exports = {
  createApplicant,
  updateApplicant,
};
