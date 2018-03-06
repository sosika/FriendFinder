var express = require("express");
var router = express.Router();
var path = require("path");
var friends = require("../data/friends.js");

//=============================================================
//      Matching Function
//=============================================================

function getBestMatch (newSurvey, friends) {
  
  var matchResultsArray = [];
  var smallestTotal = null;
  var originalMatchResults = null;

  function findSmallest(element) {
    console.log('element', element);
    console.log('matchResultsArray.sort()[0]', matchResultsArray.sort()[0]);
    return element === smallestTotal;
  }
  
  console.log("what is friends", friends);
  for (var i=0; i < friends.length; i++) {
    var currentFriend = 0;
    
    for (let j=0; j < newSurvey.scores.length; j++) {
      currentFriend += Math.abs(newSurvey.scores[j] - friends[i].scores[j]);
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
  var index = getBestMatch(newSurvey, friends); // find best match
  res.send(friends[index]);
  friends.push(newSurvey);

});

module.exports = router;

