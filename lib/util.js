const { pickHashTags } = require('./twiiter');

const classifyTweetContent = (tweets) => {
  return tweets.reduce((map, tweet) => {
    const tags = pickHashTags(tweet);

    if (tags.indexOf("아침형인간")) map["아침형인간"].push(tweet);
    else if (tags.indexOf("공부")) map["공부"].push(tweet);
    else if (tags.indexOf("독서")) map["독서"].push(tweet);
    else if (tags.indexOf("Runtastic")) map["Runtastic"].push(tweet);

    return map;
  }, {
    "아침형인간": [],
    "공부": [],
    "독서": [],
    "Runtastic": []
  });
};

module.exports = {
  classifyTweetContent
};