var express = require("express");
var router = express.Router();
var path = require("path");
var friends = require("../data/friends.js");
var newSurvey = {};

//=============================================================
//      Matching Function
//=============================================================

function getBestMatch (newSurvey, friends) {
  console.log('inside function');
  var matchResultsArray = [];
  var smallestTotal = null;
  var originalMatchResults = null;

  function findSmallest(element) {
    console.log('element', element);
    console.log('matchResultsArray.sort()[0]', matchResultsArray.sort()[0]);
    return element === smallestTotal;
  }
  
  for (var i=0; i < friends.length; i++) {
    var currentFriend = 0;
  
    for (var j=0; j < newSurvey.length; j++) {
      currentFriend += Math.abs(friends[i].scores[j] - newSurvey.scores[j]);
    }
    
    matchResultsArray.push(currentFriend);
    console.log(matchResultsArray);
  }

  originalMatchResults = matchResultsArray.slice();
  smallestTotal = matchResultsArray.sort()[0];
  console.log(matchResultsArray);
  
  return originalMatchResults.findIndex(findSmallest);
}

//=============================================================
//      HTML Routes
//=============================================================

// display friends json data
router.get("/api/friends", function(req, res) {
  var chosen = req.params.friends;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < friends.length; i++) {
      if (chosen === friends[i].routeName) {
        return res.json(friends[i]);
      }
    }
    return res.json(false);
  }
  return res.json(friends);
});

//=============================================================
//      Post Routes
//=============================================================

router.post("/api/friends", function(req, res) {
  var newSurvey = req.body;
  newSurvey.routeName = newSurvey.name.replace(/\s+/g, "").toLowerCase();
  friends.push(newSurvey);

  console.log('friends: ', friends);
  console.log('newSurvey.scores: ', newSurvey.scores);
  
  var index = getBestMatch(newSurvey, friends);
  
  res.send(friends[index]);

});

module.exports = router;

