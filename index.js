const cron = require('node-cron');
const _ = require('lodash');

const { filter, getMyTwitters } = require('./lib/twiiter');
const { classifyTweetContent } = require('./lib/util');
const { sendMail, makeMailBody } = require('./lib/mail');

// const executionCycle = "0 50 23 * * *";
const executionCycle = "*/30 * * * * *";

console.info("HELLO AUTOMATIC_HABIT_RECORDER!!!!");

if (!cron.validate(executionCycle)) {
  console.error("[ERROR] CRON CYCLE IS NOT CORRECT. CHECK VALIDATION");
  process.exit(true);
}

const task = cron.schedule(executionCycle, async () => {
  console.info("[INFO] RUN AUTOMATIC_HABIT_RECORDER. ");
  await sendMail(makeMailBody(classifyTweetContent(filter(await getMyTwitters()))));
  process.exit(1);
}, {
  schedule: false
});

task.start();

module.exports = {
  test: () => {
    return "TEST";
  }
};