const twiiter = require('../lib/twiiter');

describe("TEST Twiiter Module.", () => {
  it("TEST getMyTwitters", async (done) => {
    const tweetList = await twiiter.getMyTwitters();
    if (tweetList.length) return done();
  });
});