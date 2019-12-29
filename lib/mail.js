const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const moment = require('moment');

const config = require('../config/config.json');

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: config.mail.user,
    pass: config.mail.pwd
  }
}));

const sendMail = (mailContent) => {
  return transporter.sendMail({
    from: config.mail.user,
    to: config.mail.user,
    subject: `${moment().year()}년 ${moment().week()}주차 활동 내역`,
    text: mailContent,
  });
};

module.exports = {
  sendMail,
};