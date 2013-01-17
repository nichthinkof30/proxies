var gimmie = require('../gimmie.js');
gimmie.configure({
  'COOKIE'    : '_gm_user',
  'OAUTH_KEY' : 'd883ceb9d02d6b73eae54464075f',
  'OAUTH_SEC' : '0212f8ad3bd4c900fe3784dae456',
  '_endpoint' : 'http://api.lvh.me:3000'
});

describe("endpoint_suffix", function() {
  it("should take REQUEST_URI, split by 'gimmieapi=' and use the last segment as suffix", function() {
    var request = { url: 'http://lousy.gov/router.jsp?gimmieapi=gimmie.jsphelloworldgimmieapi=/1/rewards.json?reward_id=2&x%20y?1://' };
    expect(gimmie.endpoint_suffix(request)).toBe('/1/rewards.json?reward_id=2&x%20y?1://'); // raw value, no parsing whatsoever
  });
});

describe("proxy", function() {
  var result = [];
  var request = {
    url: 'http://lousy.gov/router.jsp?gimmie.jsp&gimmieapi=/1/rewards.json?reward_id=3', // test data
    headers: {} // needed to make "new Cookies(request, response);" happy
  }
  var response = {};
  it("should call correct endpoint url", function() {
    spyOn(gimmie.OAuth, 'get').andCallFake(function(url, other, stuff) {
      expect(url).toBe('http://api.lvh.me:3000/1/rewards.json?reward_id=3');
    });
    gimmie.proxy(request, response);
  })
})
