'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var board;

// Enables CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://local.pizza.wixpress.com:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');
  // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

app.get('/game', function (req, res) {
  res.send(board);
});

app.post('/game', function (req, res) {
  board = req.body;
  res.send(200);
});

app.listen(3000);