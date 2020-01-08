const _ = require('lodash');

let dev_config = {};
if (process.env.NODE_ENV !== "production") dev_config = require('./config.json');

const config = {
  twitter: {
    consumer_key: process.env.TWITTER_API_KEY || _.get(dev_config, 'twitter.consumer_key'),
    consumer_secret: process.env.TWITTER_API_SECRET_KEY || _.get(dev_config, 'twitter.consumer_secret')
  },
  google: {
    user: process.env.GOOGLE_USER || _.get(dev_config, 'google.user'),
    client_id: process.env.GOOGLE_CLIENT_ID || _.get(dev_config, 'google.client_id'),
    client_secret: process.env.GOOGLE_CLIENT_SECRET || _.get(dev_config, 'google.client_secret'),
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN || _.get(dev_config, 'google.refresh_token'),
    redirect_url: "https://developers.google.com/oauthplayground"
  }
};

module.exports = config;