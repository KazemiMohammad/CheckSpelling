export default [
  {
    corpus: "helllo woirld",
    expected: "hello world",
    POST: {
      "data": {
        "misspellings": [
          {
            "start": 0,
            "end": 6
          },
          {
            "start": 7,
            "end": 13
          }
        ]
      },
      "status": 200,
      "statusText": "",
      "headers": {
        "content-length": "59",
        "content-type": "application/json; charset=utf-8"
      },
      "config": {
        "transformRequest": {},
        "transformResponse": {},
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8"
        },
        "method": "post",
        "url": "https://spellchecker.glitch.me/checkspelling",
        "data": "{\"corpus\":\"helllo woirld\"}"
      },
      "request": {}
    },
    GET: {
      helllo: {
        "data": {
          "word": "helllo",
          "corrections": [
            "hello",
            "hell lo",
            "hell-lo",
            "hellhole",
            "hellion",
            "hell",
            "Hellene",
            "Helicon",
            "helical"
          ]
        },
        "status": 200,
        "statusText": "",
        "headers": {
          "content-length": "119",
          "content-type": "application/json; charset=utf-8"
        },
        "config": {
          "transformRequest": {},
          "transformResponse": {},
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1,
          "headers": {
            "Accept": "application/json, text/plain, */*"
          },
          "method": "get",
          "baseURL": "https://spellchecker.glitch.me",
          "params": {
            "word": "helllo"
          },
          "url": "https://spellchecker.glitch.me/corrections"
        },
        "request": {}
      },
      woirld: {
        "data": {
          "word": "woirld",
          "corrections": [
            "world",
            "wold",
            "wouldst",
            "wilder"
          ]
        },
        "status": 200,
        "statusText": "",
        "headers": {
          "content-length": "67",
          "content-type": "application/json; charset=utf-8"
        },
        "config": {
          "transformRequest": {},
          "transformResponse": {},
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1,
          "headers": {
            "Accept": "application/json, text/plain, */*"
          },
          "method": "get",
          "baseURL": "https://spellchecker.glitch.me",
          "params": {
            "word": "woirld"
          },
          "url": "https://spellchecker.glitch.me/corrections"
        },
        "request": {}
      }
    }
  }
];