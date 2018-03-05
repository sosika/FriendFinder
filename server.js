var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Require routes here
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Routes are used here
app.use(htmlRoutes);
app.use(apiRoutes);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
