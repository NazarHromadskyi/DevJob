const { Applicant } = require('../models');

module.exports = {
  getOne: (params = {}) => Applicant.findOne(params),

  create: (data) => Applicant.create(data),

  update: (id, data) => Applicant.findByIdAndUpdate(id, data, { new: true }),

  delete: (id) => Applicant.findByIdAndDelete(id),
};
