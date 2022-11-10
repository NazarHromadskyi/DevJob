const { Position, Applicant } = require('../models');

module.exports = {
  findMatches: (Model, { category, level, japanese }) => {
    const filterObject = {};
    let japaneseSearchIn;

    if (Model === Applicant) {
      japanese ? japaneseSearchIn = [true] : japaneseSearchIn = [true, false];

      Object.assign(filterObject, {
        $and: [
          { categories: { $in: category } },
          { level: { $eq: level } },
          { japaneseKnowledge: { $in: japaneseSearchIn } },
        ],
      });
    }

    if (Model === Position) {
      japanese ? japaneseSearchIn = [true, false] : japaneseSearchIn = [false];

      Object.assign(filterObject, {
        $and: [
          { category: { $in: category } },
          { level: { $eq: level } },
          { japaneseRequired: { $in: japaneseSearchIn } },
        ],
      });
    }

    return Model.find(filterObject);
  },
};
