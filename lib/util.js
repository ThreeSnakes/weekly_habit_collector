const { pickHashTags } = require('./twiiter');

const classifyTweetContent = (tweets) => {
  return tweets.reduce((map, tweet) => {
    const tags = pickHashTags(tweet);

    if (tags.indexOf("공부") > -1) map["공부"].push(tweet);
    else if (tags.indexOf("개발") > -1) map["개발"].push(tweet);
    else if (tags.indexOf("독서") > -1) map["독서"].push(tweet);
    else if (tags.indexOf("운동") > -1) map["운동"].push(tweet);
    else if (tags.indexOf("블로그") > -1) map["블로그"].push(tweet);

    return map;
  }, {
    "공부": [],
    "개발": [],
    "독서": [],
    "운동": [],
    "블로그": []
  });
};

module.exports = {
  classifyTweetContent
};