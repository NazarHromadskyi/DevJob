module.exports = {
  PORT: process.env.PORT || 3311,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/',
  DATABASE_NAME: process.env.DATABASE_NAME || 'DevJobDB',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
