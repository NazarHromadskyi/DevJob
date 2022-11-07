const { Schema, model } = require('mongoose');
const { categoryEnum, levelEnum, modelNames } = require('../constants');

const PositionSchema = new Schema({
  description: {
    type: String,
    required: false,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    enum: Object.values(categoryEnum),
    lowercase: true,
    trim: true,
  },

  company: {
    type: String,
    required: true,
    trim: true,
  },

  level: {
    type: String,
    required: true,
    enum: Object.values(levelEnum),
    lowercase: true,
    trim: true,
  },

  japaneseRequired: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model(modelNames.POSITION, PositionSchema);
