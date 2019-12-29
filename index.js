const { filter, getMyTwitters } = require('./lib/twiiter');
const { classifyTweetContent } = require('./lib/util');
const { sendMail, makeMailBody } = require('./lib/mail');

const runner = async () => {
  console.info("[INFO] RUN AUTOMATIC_HABIT_RECORDER.");
  await sendMail(makeMailBody(classifyTweetContent(filter(await getMyTwitters()))));
  console.info("[INFO] FINISH AUTOMATIC_HABIT_RECORDER.");
  process.exit(0);
};

runner();