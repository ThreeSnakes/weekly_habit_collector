const Twitter = require('twitter');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config/config.json');

const MY_SCREEN_NAME = "SnakesThree";

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

const pickHashTags = (tweet) => _.chain(tweet).get('entities.hashtags').map((hashtags) => hashtags.text).value();

const thisWeekTweet = (tweet) => {
  const weekAgo = moment().add(-7, 'days').startOf('day');
  return weekAgo <= moment(new Date(tweet.created_at));
};

const validTagTweet = (tweet) => {
  const PICK_TARGET_TAGS = ["공부", "개발", "독서", "운동", "블로그"];
  const tags = pickHashTags(tweet);
  return _.intersection(PICK_TARGET_TAGS, tags).length > 0;
};

const filter = (tweetList) => {
  if (!tweetList.length) return [];
  _.remove(tweetList, (tweet) => {
    return !(validTagTweet(tweet) && thisWeekTweet(tweet));
  });
  return tweetList;
};

module.exports = {
  getMyTwitters,
  thisWeekTweet,
  validTagTweet,
  filter,
  pickHashTags,
};
