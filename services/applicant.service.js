const { Applicant } = require('../models');

module.exports = {
  find: (params = {}) => Applicant.find(params),

  getOne: (params = {}) => Applicant.findOne(params),

  create: (data) => Applicant.create(data),

  update: (id, data) => Applicant.findByIdAndUpdate(id, data, { new: true }),

  delete: (id) => Applicant.findByIdAndDelete(id),
};
