var path = require('path');
var nconf = require('nconf');

var express = require('express');

var app = express();

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-session')({
  name: 'session',
  keys: [nconf.get('COOKIE_SECRET')],
  maxAge: 60 * 60 * 1000 // 1 hour
}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/admin'));

module.exports = app;
