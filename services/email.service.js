const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const emailTemplatesObj = require('../email-templates');
const { ApiError } = require('../errors');

const sendEmail = async (userMail, emailAction, context = {}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: process.env.NO_REPLY_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extname: '.hbs',
      defaultLayout: 'main',
      layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
      partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
    },
    viewPath: path.join(process.cwd(), 'email-templates', 'views'),
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const { subject, template } = emailTemplatesObj[emailAction] || {};

  if (!subject || !template) {
    throw new ApiError('Wrong template name', 500);
  }

  return transporter.sendMail({
    to: userMail,
    subject,
    template, // todo styles
    context,
  });
};

module.exports = {
  sendEmail,
};
