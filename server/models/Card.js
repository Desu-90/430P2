const mongoose = require('mongoose');
const _ = require('underscore');

const setWord = (word) => _.escape(word).trim();

const CardSchema = new mongoose.Schema({
  eWord: {
    type: String,
    required: true,
    trim: true,
    set: setWord,
  },
  jWord: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CardSchema.statics.toAPI = (doc) => ({
  eWord: doc.eWord,
  jWord: doc.jWord,
});
const CardModel = mongoose.model('Card', CardSchema);
module.exports = CardModel;
