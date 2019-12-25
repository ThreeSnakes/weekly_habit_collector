const Twitter = require('twitter');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config/config.json');

const MY_SCREEN_NAME = "SnakesThree";
const PICK_TARGET_TAGS = ["아침현인간", "공부", "독서", "Runtastic"];

const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: '',
  access_token_secret: ''
});

const getMyTwitters = async () => {
  var params = { screen_name: MY_SCREEN_NAME };
  return await client.get('statuses/user_timeline', params).then((tweetList) => {
    return tweetList.map((tweet) => _.pick(tweet, ['created_at', 'entities', 'text']));
  });
};

const filterByDateTime = (tweetList) => {
  if (!tweetList.length) return [];

  const weekAgo = moment().add(-7, 'days');

  _.remove(tweetList, (tweet) => {
    return weekAgo > moment(new Date(tweet.created_at));
  });

  return tweetList;
};

module.exports = {
  getMyTwitters,
  filterByDateTime,
};
