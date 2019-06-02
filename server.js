"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
// Actual quiz mock data
var quiz_1 = require("./quiz/quiz");
var PORT = 8080;
var app = express();
app.get("/api/quiz", cors(), function (req, res) {
    res.send(quiz_1.quiz);
});
app.listen(PORT, function () { return console.log("Example app listening on port " + PORT + "!"); });
