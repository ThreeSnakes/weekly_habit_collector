require('should');

const twiiter = require('../lib/twiiter');

const sampleTweet = [{
  "created_at": "Sat Dec 28 14:20:29 +0000 2019",
  "entities": {
    "hashtags": [{
      "text": "독서",
      "indices": [
        7,
        10
      ]
    },
    {
      "text": "운동",
      "indices": [
        11,
        14
      ]
    },
    {
      "text": "아침형인간",
      "indices": [
        15,
        21
      ]
    }
    ],
    "symbols": [],
    "user_mentions": [],
    "urls": []
  },
  "text": "테스트456\n#독서 #운동 #아침형인간"
},
{
  "created_at": "Sat Dec 28 14:19:03 +0000 2019",
  "entities": {
    "hashtags": [{
      "text": "독서",
      "indices": [
        7,
        10
      ]
    }],
    "symbols": [],
    "user_mentions": [],
    "urls": []
  },
  "text": "테스트123\n#독서"
},
{
  "created_at": "Wed Dec 25 21:01:52 +0000 2019",
  "entities": {
    "hashtags": [],
    "symbols": [],
    "user_mentions": [],
    "urls": []
  },
  "text": "test 아아"
},
{
  "created_at": "Sat Aug 03 00:05:49 +0000 2019",
  "entities": {
    "hashtags": [{
      "text": "Runtastic",
      "indices": [
        0,
        10
      ]
    }],
    "symbols": [],
    "user_mentions": [],
    "urls": [{
      "url": "https://t.co/ldi1RunjAO",
      "expanded_url": "https://www.runtastic.com/sport-sessions/ff4e4fd3-0954-40f6-9e65-5766ab334c54?sharing_token=5d44cfcb7d441615fe3a45df",
      "display_url": "runtastic.com/sport-sessions…",
      "indices": [
        61,
        84
      ]
    }]
  },
  "text": "#Runtastic PRO 앱으로 54m 20s 동안 5.45 km 의 Runtastic 러닝를 방금 마침: https://t.co/ldi1RunjAO"
}];

describe("TEST Twiiter Module.", () => {
  it("test getMyTwitters()", (done) => {
    twiiter.getMyTwitters().then(() => done());
  }).timeout(3000);

  it("test thisWeekTweet()", () => {
    sampleTweet.map((tweet) => twiiter.thisWeekTweet(tweet)).should.eql([true, true, true, false]);
  });

  it("test validTagTweet()", () => {
    sampleTweet.map((tweet) => twiiter.validTagTweet(tweet)).should.eql([true, true, false, true]);
  });

  it("test filter", () => {
    twiiter.filter(sampleTweet).should.eql([{
      "created_at": "Sat Dec 28 14:20:29 +0000 2019",
      "entities": {
        "hashtags": [{
          "text": "독서",
          "indices": [
            7,
            10
          ]
        },
        {
          "text": "운동",
          "indices": [
            11,
            14
          ]
        },
        {
          "text": "아침형인간",
          "indices": [
            15,
            21
          ]
        }],
        "symbols": [],
        "user_mentions": [],
        "urls": []
      },
      "text": "테스트456\n#독서 #운동 #아침형인간"
    },
    {
      "created_at": "Sat Dec 28 14:19:03 +0000 2019",
      "entities": {
        "hashtags": [{
          "text": "독서",
          "indices": [
            7,
            10
          ]
        }],
        "symbols": [],
        "user_mentions": [],
        "urls": []
      },
      "text": "테스트123\n#독서"
    }
    ]);
  });
});