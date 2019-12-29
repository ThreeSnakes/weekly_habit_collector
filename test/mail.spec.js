require('should');

const mail_lib = require('../lib/mail');

describe('TEST Mail Module.', () => {
  it("test sendMail()", (done) => {
    mail_lib.sendMail("TEST").then(() => done());
  }).timeout(5000);
});