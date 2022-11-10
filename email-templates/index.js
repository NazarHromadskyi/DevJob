const {
  emailActionEnum: {
    APPLICANT_CREATED,
    APPLICANT_UPDATED,
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

  [APPLICANT_CREATED]: {
    subject: 'Applicant has been created',
    templateName: 'applicant-created',
  },

  [APPLICANT_UPDATED]: {
    subject: 'Applicant has been updated',
    templateName: 'applicant-updated',
  },
};
