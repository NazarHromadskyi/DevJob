const { statusCode } = require('../constants');
const { ApiError } = require('../errors');
const { applicantService } = require('../services');

module.exports = {
  isApplicantUnique: (isApplicantNew = true) => async (req, res, next) => {
    try {
      if (isApplicantNew) {
        const { item } = req;

        if (item) {
          throw new ApiError(`Applicant with email:${item.email} already exist`, statusCode.CONFLICT);
        }
      }

      const {
        body: { email },
        item: { id },
      } = req;
      const applicant = await applicantService.getOne({ email, _id: { $ne: id } });

      if (applicant) {
        throw new ApiError(`Applicant with email:${email} already exist`, statusCode.CONFLICT);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
