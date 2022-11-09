const { Position } = require('../models');

module.exports = {
  getAll: () => Position.find({}),

  create: (data) => Position.create(data),

  updateById: (id, data) => Position.findByIdAndUpdate(id, data),

  deleteById: (id) => Position.findByIdAndDelete(id),
};
