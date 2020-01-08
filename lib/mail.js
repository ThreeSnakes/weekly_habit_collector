const nodemailer = require('nodemailer');
const moment = require('moment');
const _ = require('lodash');
const { google } = require('googleapis');

const config = require('../config/config');

const oauth2Client = new google.auth.OAuth2(
  config.google.client_id,
  config.google.client_secret,
  config.google.redirect_url
);

oauth2Client.setCredentials({
  refresh_token: config.google.refresh_token
});
const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: config.google.user,
    clientId: config.google.client_id,
    clientSecret: config.google.client_secret,
    refreshToken: config.google.refresh_token,
    accessToken,
  }
});

const makeMailBody = (tweetMap) => {
  return _.reduce(tweetMap, (body, tweets, hashtag) => {
    body += `<h4>${hashtag}</h4>\n`;
    body += tweets.length > 0 ? tweets.map((tweet) => `${moment(new Date(tweet.created_at)).utcOffset(9).format('YYYY-MM-DD HH:mm:ss')} -> ${tweet.text.replace('\n', '')}`).join('<br/>') : "활동없음... 해라";
    body += `\n`;
    return body;
  }, '');
};

const sendMail = (mailContent) => {
  return transporter.sendMail({
    from: config.google.user,
    to: config.google.user,
    subject: `${moment().year()}년 ${moment().week()}주차 활동 내역`,
    html: mailContent,
  });
};

module.exports = {
  sendMail,
  makeMailBody,
};