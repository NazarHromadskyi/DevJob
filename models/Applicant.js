const { Schema, model } = require('mongoose');

const {
  categoryEnum,
  levelEnum,
  modelNames,
} = require('../constants');

const ApplicantSchema = new Schema({
  categories: {
    type: [String],
    required: true,
    enum: Object.values(categoryEnum),
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  level: {
    type: String,
    required: true,
    enum: Object.values(levelEnum),
    lowercase: true,
    trim: true,
  },

  japaneseKnowledge: {
    type: Boolean,
    required: true,
  },

}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model(modelNames.APPLICANT, ApplicantSchema);
