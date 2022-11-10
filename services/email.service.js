const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const emailTemplatesObj = require('../email-templates');
const { ApiError } = require('../errors');

const sendEmail = async (userMail, emailAction, locals = {}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.NO_REPLY_PASSWORD,
    },
  });

  const templateParser = new EmailTemplates({
    views: {
      root: path.join(process.cwd(), 'email-templates'),
    },
  });

  const emailInfo = emailTemplatesObj[emailAction];

  if (!emailInfo) {
    throw new ApiError('Wrong template name', 500);
  }

  const html = await templateParser.render(
    emailInfo.templateName,
    { ...locals },
  );

  return transporter.sendMail({
    from: 'No reply DevJob',
    to: userMail,
    subject: emailInfo.subject,
    html,
  });
};

module.exports = {
  sendEmail,
};
