
var nconf = require('nconf');
var path = require('path');
nconf.argv().env().file({file: path.join(__dirname, 'config.json')}).defaults({
  NODE_ENV: 'dev',
});

var express = require('express');
var mainAnnouncement = require('./routes/mainAnnouncements.js');
var smallAnnouncement = require('./routes/smallAnnouncements.js');
var memoryVerse = require('./routes/memoryVerse.js');
var staff = require('./routes/staff.js');
var belief = require('./routes/believe.js');
var ministry = require('./routes/ministry.js');
var app = express();
var logger = require('morgan');

if (nconf.get('NODE_ENV') === 'dev') {
  app.use(logger('dev'));
}

app.use('/admin', require('./admin'));
app.use('/', require('./routes'));
app.use('/staff', staff);
app.use('/belief', belief);
app.use('/ministry', ministry);

app.use(express.static('dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
})

var db = require('./db.js');
db.initialized.then(function() {
  app.listen(8000, function() {
    console.log("Listening on port 8000");
  });
});
