$(function(){
  var CONSUMER_KEY = "IoSmb1S_lXE6Z_m0_hcTzw"
  var CONSUMER_SECRET = "_BIPncQwQqjGUJCq0tz83dj6Ibk"
  var TOKEN	= "95CxcIuet0ZUczb5hdASmARH9EQ200LM"
  var TOKEN_SECRET = "mPot3DR7h7tbrZuqw6NSDYftdzI"

  $("#getStuff").click(function(){
    console.log("clicked!");
    $.ajax({
      url: "https://api.yelp.com/v2/search/?term=food&location=London",
      datatype: "jsonp",
      jsonpCallback: "cb",
      cache: true,
      headers: {
        "oauth_consumer_key": CONSUMER_KEY,
        "oath_token": TOKEN,
        "oauth_signature_method": "hmac-sha1",
        "oauth_signature": TOKEN_SECRET,
        "oauth_timestamp": Date.now(),
        "oauth_nonce": "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
      },
      success: function(data){
        console.log("great success!")
      }

    })
  })
});
