const { Router } = require('express');

const {
  dbFieldsEnum: { _ID },
  searchParamsEnum: { APPLICANT_ID, PARAMS },
} = require('../constants');
const { applicantController } = require('../controllers');
const {
  applicantMiddleware: { isApplicantUnique },
  commonMiddleware: {
    getItemByParam, isItemPresent,
    validateByParam,
  },
} = require('../middlewares');
const { applicantValidator } = require('../validators');
const { Applicant } = require('../models');

const applicantRouter = Router();

applicantRouter.post(
  '/',
  validateByParam(applicantValidator.createApplicant),
  applicantController.create,
);

applicantRouter.put(
  '/:applicantId',
  validateByParam(applicantValidator.updateApplicant),
  getItemByParam(Applicant, APPLICANT_ID, PARAMS, _ID),
  isItemPresent,
  isApplicantUnique(false),
  applicantController.update,
);
applicantRouter.delete(
  '/:applicantId',
  getItemByParam(Applicant, APPLICANT_ID, PARAMS, _ID),
  isItemPresent,
  applicantController.delete,
);

module.exports = applicantRouter;
