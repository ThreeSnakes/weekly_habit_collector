const cron = require('node-cron');

const twitter_lib = require('./lib/twiiter');
const mail_lib = require('./lib/mail');

// const executionCycle = "0 50 23 * * *";
const executionCycle = "*/30 * * * * *";

console.info("HELLO AUTOMATIC_HABIT_RECORDER!!!!");

if (!cron.validate(executionCycle)) {
  console.error("[ERROR] CRON CYCLE IS NOT CORRECT. CHECK VALIDATION");
  process.exit(true);
}

const task = cron.schedule(executionCycle, async () => {
  console.info("[INFO] RUN AUTOMATIC_HABIT_RECORDER. ");
  const tweets = await twitter_lib.getMyTwitters();
  const filteredTweets = twitter_lib.filter(tweets);
  console.info(JSON.stringify(filteredTweets, null, 4));
  await mail_lib.sendMail("TEST");
}, {
  schedule: false
});

task.start();

module.exports = {
  test: () => {
    return "TEST";
  }
};