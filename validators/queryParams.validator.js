const Joi = require('joi');
const { categoryEnum, levelEnum } = require('../constants');

const validate = Joi.object({
  category: Joi
    .string()
    .trim()
    .lowercase()
    .valid(...Object.values(categoryEnum)),

  level: Joi
    .string()
    .valid(...Object.values(levelEnum))
    .trim()
    .lowercase(),

  tag: Joi
    .string()
    .trim(),
});

module.exports = {
  validate,
};
