const _ = require('lodash');

let dev_config = {};
if (process.env.NODE_ENV !== "production") dev_config = require('./config.json');

const config = {
  twitter: {
    consumer_key: process.env.TWITTER_API_KEY || _.get(dev_config, 'twitter.consumer_key'),
    consumer_secret: process.env.TWITTER_API_SECRET_KEY || _.get(dev_config, 'twitter.consumer_secret')
  },
  mail: {
    user: process.env.GMAIL_USER || _.get(dev_config, 'mail.user'),
    pwd: process.env.GMAIL_PWD || _.get(dev_config, 'mail.pwd')
  }
};

module.exports = config;