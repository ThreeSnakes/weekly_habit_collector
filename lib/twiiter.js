const Twitter = require('twitter');
const config = require('../config/config.json');

const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: '',
  access_token_secret: ''
});

const MY_SCREEN_NAME = "SnakesThree";

const getMyTwitters = () => {
  var params = { screen_name: MY_SCREEN_NAME };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.info(tweets);
    }
  });
};

module.exports = {
  getMyTwitters
};
