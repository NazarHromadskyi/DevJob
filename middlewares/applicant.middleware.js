const { statusCodesEnum } = require('../constants');
const { ApiError } = require('../errors');
const { applicantService } = require('../services');

module.exports = {
  isApplicantUnique: (isApplicantNew = true) => async (req, res, next) => {
    try {
      if (isApplicantNew) {
        const { item } = req;

        if (!item) {
          return next();
        }

        if (item) {
          throw new ApiError(`Applicant with email: [${item.email}] already exist`, statusCodesEnum.CONFLICT);
        }
      }

      const {
        body: { email },
        item: { id },
      } = req;
      const applicant = await applicantService.getOne({ email, _id: { $ne: id } });

      if (applicant) {
        throw new ApiError(`Applicant with email: [${email}] already exist`, statusCodesEnum.CONFLICT);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
