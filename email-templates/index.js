const {
  emailActionEnum: {
    POSITION_CREATED,
    POSITION_DELETED,
  },
} = require('../constants');

module.exports = {
  [POSITION_CREATED]: {
    subject: 'Position has been created',
    templateName: 'position-created',
  },

  [POSITION_DELETED]: {
    subject: 'Position has been deleted',
    templateName: 'position-deleted',
  },
};
