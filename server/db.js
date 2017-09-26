
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var nconf = require('nconf');

var db = {
  initialized: new Promise(function(resolve, reject) {
    mongoose.connect(nconf.get('MONGODB_URI') || 'mongodb://localhost:27017/gccweb', function(err) {
      if (err) reject(err);
      console.log('Connected to database');

      if (nconf.get('NODE_ENV') === 'dev') {
        mongoose.set('debug', true);
        setTimeout(function() {
          seedDB().then(resolve).catch(function(err) {
            throw err;
          })
        }, 10);
      } else {
        resolve();
      }
    });
  })
};

module.exports = db;

var async = require('async');
var MainAnnouncement = require('./models/mainAnnouncement.js');
var SmallAnnouncement = require('./models/smallAnnouncement.js');
var MemoryVerse = require('./models/memoryVerse.js');
var File = require('./models/file.js');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// INITIAL SEED DATA FOR DEV
// drops collections and repopulates with seed data
function seedDB() {
  console.log('seeding DB');

  var emptyDB = new Promise(function(resolve, reject) {
    async.parallel([
      function(cb) { File.remove({}, cb); },
      function(cb) { MainAnnouncement.remove({}, cb); },
      function(cb) { SmallAnnouncement.remove({}, cb); },
      function(cb) { MemoryVerse.remove({}, cb); },
    ], function(err, results) {
      if (err) reject(err);
      resolve();
    });
  });

  var clearIndexes = new Promise(function(resolve, reject) {
    async.parallel([
      function(cb) { File.collection.dropIndexes(cb); },
      function(cb) { MainAnnouncement.collection.dropIndexes(cb); },
      function(cb) { SmallAnnouncement.collection.dropIndexes(cb); },
      function(cb) { MemoryVerse.collection.dropIndexes(cb); },
    ], function(err, results) {
      if (err) reject(err);
      resolve();
    });
  });

  var createEntries = new Promise(function(resolve, reject) {
    async.parallel([
      function(callback) {
        fs.readFile(path.join(__dirname, 'seed/mainAnnouncements.json'), 'utf8', function(err, data) {
          if (err) throw err;

          var announcements = JSON.parse(data);
          async.parallel(announcements.map(function(announcement) {
            return function(cb) {
              var picUrl = announcement.pic;
              var filepath = path.join(__dirname, 'seed', picUrl);
              fs.readFile(filepath, function(err, data) {
                File.create({
                  data: data,
                  contentType: mime.lookup(filepath)
                }, function(err, file) {
                  announcement.pic = file._id;
                  MainAnnouncement.create(announcement, cb);
                });
              });
            }
          }), callback);
        });
      },

      function(callback) {
        fs.readFile(path.join(__dirname, 'seed/smallAnnouncements.json'), 'utf8', function(err, data) {
          var announcements = JSON.parse(data);
          async.parallel(announcements.map(function(text) {
            return function(cb) {
              SmallAnnouncement.create({
                text: text
              }, cb)
            }
          }), callback);
        });
      },

      function(callback) {
        fs.readFile(path.join(__dirname, 'seed/memoryVerses.json'), 'utf8', function(err, data) {
          var verses = JSON.parse(data);
          async.parallel(verses.map(function(verse) {
            return function(cb) {
              var picUrl = verse.pic;
              var filepath = path.join(__dirname, 'seed', picUrl);
              fs.readFile(filepath, function(err, data) {
                File.create({
                  data: data,
                  contentType: mime.lookup(filepath)
                }, function(err, file) {
                  verse.pic = file._id;
                  MemoryVerse.create(verse, cb);
                });
              });
            }
          }), callback);
        });
      }

    ], function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return emptyDB.then(clearIndexes).then(createEntries);
}
