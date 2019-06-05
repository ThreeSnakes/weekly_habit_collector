const cron = require('node-cron');

// const executionCycle = "0 50 23 * * *";
const executionCycle = "*/30 * * * * *";

console.info("HELLO AUTOMATIC_HABIT_RECORDER!!!!");

if (!cron.validate(executionCycle)) {
  console.error("[ERROR] CRON CYCLE IS NOT CORRECT. CHECK VALIDATION");
  process.exit(true);
}

const task = cron.schedule(executionCycle, () => {
  console.info("[INFO] RUN AUTOMATIC_HABIT_RECORDER. ");
}, {
  schedule: false
});

task.start();

module.exports = {
  test: () => {
    return "TEST";
  }
};