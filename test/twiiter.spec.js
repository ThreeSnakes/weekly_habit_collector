const twiiter = require('../lib/twiiter');

describe("TEST Twiiter Module.", () => {
  it("TEST getMyTwitters", async (done) => {
    const tweetList = await twiiter.getMyTwitters();
    if (tweetList.length) return done();
  });

  // it("TEST pickTweetByHashTagAndDate", () => {
  //   const mock_tweetList = [
  //     {
  //       created_at: 
  //     },
  //     {

  //     }
  //   ];
  // });
});