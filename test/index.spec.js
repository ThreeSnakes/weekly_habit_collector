const index = require('../index');

describe("index.js TEST", () => {
  it("TEST function must return 'TEST'", (done) => {
    if (index.test() === 'TEST') {
      done();
    }
  });
});