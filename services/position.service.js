const { Position } = require('../models');

module.exports = {
  getAll: async (query = {}) => {
    const filterObject = {};

    Object.keys(query).forEach((filterParam) => {
      // eslint-disable-next-line default-case
      switch (filterParam) {
        case 'category': {
          filterObject.category = { $eq: query.category };
          break;
        }

        case 'level': {
          filterObject.level = { $eq: query.level };
          break;
        }

        case 'tag': {
          filterObject.description = { $regex: `${query.tag}`, $options: 'gi' };
          break;
        }
      }
    });

    const items = await Position.find(filterObject);

    return items;
  },

  create: (data) => Position.create(data),

  updateById: (id, data) => Position.findByIdAndUpdate(id, data, { new: true }),

  deleteById: (id) => Position.findByIdAndDelete(id),

  findMatches: (category, level, japanese) => {
    const japaneseSearchIn = japanese ? [true, false] : [false];

    return Position.find({
      $and: [
        { category: { $in: category } },
        { level: { $eq: level } },
        { japaneseRequired: { $in: japaneseSearchIn } },
      ],
    });
  },
};
