const { filter, getMyTwitters } = require('./lib/twiiter');
const { classifyTweetContentByCreatedAt } = require('./lib/util');
const { sendMail, makeMailBody } = require('./lib/mail');

const runner = async () => {
  console.info("[INFO] RUN AUTOMATIC_HABIT_RECORDER.");
  await sendMail(makeMailBody(classifyTweetContentByCreatedAt(filter(await getMyTwitters()))));
  console.info("[INFO] FINISH AUTOMATIC_HABIT_RECORDER.");
  process.exit(0);
};

runner();