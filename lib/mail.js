const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const moment = require('moment');
const _ = require('lodash');

const config = require('../config/config.json');

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: config.mail.user,
    pass: config.mail.pwd
  }
}));

const makeMailBody = (tweetMap) => {
  return _.reduce(tweetMap, (body, tweets, hashtag) => {
    body += `<h4>${hashtag}</h4>\n`;
    body += tweets.length > 0 ? tweets.map((tweet) => `${moment(new Date(tweet.created_at)).format('YYYY-MM-DD HH:mm:ss')} -> ${tweet.text.replace('\n', '')}`).join('<br/>') : "활동없음... 해라";
    body += `\n`;
    return body;
  }, '');
};

const sendMail = (mailContent) => {
  return transporter.sendMail({
    from: config.mail.user,
    to: config.mail.user,
    subject: `${moment().year()}년 ${moment().week()}주차 활동 내역`,
    html: mailContent,
  });
};

module.exports = {
  sendMail,
  makeMailBody,
};