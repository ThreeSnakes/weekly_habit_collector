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

class TwitterObject {
  constructor(obj) {
    this.created_at = obj.created_at;
    this.id = obj.id;
    this.id_str = obj.id_str;
    this.text = obj.text;
    this.truncated = obj.truncated;
    this.entities = obj.entities;
    this.source = obj.source;
    this.in_reply_to_status_id = obj.in_reply_to_status_id;
    this.in_reply_to_status_id_str = obj.in_reply_to_status_id_str;
    this.in_reply_to_user_id = obj.in_reply_to_user_id;
    this.in_reply_to_user_id_str = obj.in_reply_to_user_id_str;
    this.in_reply_to_screen_name = obj.in_reply_to_screen_name;
    this.user = {
      id: obj.user.id,
      id_str: obj.user.id_str,
      name: obj.user.name,
      screen_name: obj.user.screen_name,
      location: obj.user.location,
      description: obj.user.description,
      url: obj.user.url,
      entities: obj.user.entities,
      protected: obj.user.protected,
      followers_count: obj.user.followers_count,
      friends_count: obj.user.friends_count,
      listed_count: obj.user.listed_count,
      created_at: obj.user.created_at,
      favourites_count: obj.user.favourites_count,
      utc_offset: obj.user.utc_offset,
      time_zone: obj.user.time_zone,
      geo_enabled: obj.user.geo_enabled,
      verified: obj.user.verified,
      statuses_count: obj.user.statuses_count,
      lang: obj.user.lang,
      contributors_enabled: obj.user.contributors_enabled,
      is_translator: obj.user.is_translator,
      is_translation_enabled: obj.user.is_translation_enabled,
      profile_background_color: obj.user.profile_background_color,
      profile_background_image_url: obj.user.profile_background_image_url,
      profile_background_image_url_https: obj.user.profile_background_image_url_https,
      profile_background_tile: obj.user.profile_background_tile,
      profile_image_url: obj.user.profile_image_url,
      profile_image_url_https: obj.user.profile_image_url_https,
      profile_link_color: obj.user.profile_link_color,
      profile_sidebar_border_color: obj.user.profile_sidebar_border_color,
      profile_sidebar_fill_color: obj.user.profile_sidebar_fill_color,
      profile_text_color: obj.user.profile_text_color,
      profile_use_background_image: obj.user.profile_use_background_image,
      has_extended_profile: obj.user.has_extended_profile,
      default_profile: obj.user.default_profile,
      default_profile_image: obj.user.default_profile_image,
      following: obj.user.following,
      follow_request_sent: obj.user.follow_request_sent,
      notifications: obj.user.notifications,
      translator_type: obj.user.translator_type
    };
    this.geo = obj.geo;
    this.coordinates = obj.coordinates;
    this.place = obj.place;
    this.contributors = obj.contributors;
    this.is_quote_status = obj.is_quote_status;
    this.retweet_count = obj.retweet_count;
    this.favorite_count = obj.favorite_count;
    this.favorited = obj.favorited;
    this.retweete = obj.retweeted;
    this.possibly_sensitive = obj.possibly_sensitive;
    this.lang = obj.lang;
  }
}

const getMyTwitters = async () => {
  var params = { screen_name: MY_SCREEN_NAME };
  return await client.get('statuses/user_timeline', params)
  .then((tweets) => {
    const tweetList = tweets.map((tweet) => { return new TwitterObject(tweet); });
    // console.info(JSON.stringify(tweetList, null, 4));

    return tweetList;
  });
};

const pickTweetByHashTagAndDate = (tweetList) => {
  if (!tweetList.length) return [];

  const TODAY = moment().format("YYYY-MM-DD");
  const PICK_TARGET_TAGS = ["아침현인간", "공부", "독서", "Runtastic"];

  _.remove(tweetList, (tweet) => {
    const tweetDate = moment(tweet.created_at).format("YYYY-MM-DD");
    const tweetTags = _.chain(tweet).get('entities.hashtags').map((tag) => { return tag.text; });

    if (tweetDate !== TODAY) return true;
    if (!tweetTags.length) return true;

    if (tweetTags.includeOf(PICK_TARGET_TAGS)) {
      return false;
    }
  });

  return tweetList;
};

module.exports = {
  getMyTwitters,
  pickTweetByHashTagAndDate,
};
