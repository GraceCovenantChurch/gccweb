var mongoose = require('mongoose');
var File = require('./file');

var Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  link: {
    type: String,
  },
  pic: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  _pic: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: undefined },
});

Schema.pre('remove', function(next) {
  File.findByIdAndRemove(this.pic).exec();
  next();
});

Schema.pre('save', function(next) {
  if (this.isModified('pic')) {
    if (this._pic) {
      File.findByIdAndRemove(this._pic).exec();
    }
    this._pic = this.pic;
  }
  next();
});

var Model = mongoose.model('MainAnnouncement', Schema);

module.exports = Model;
