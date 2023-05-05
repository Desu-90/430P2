const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  public: {
    type: Boolean,
    default: false,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

QuizSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  public: doc.public,
  cards: doc.cards,
});
const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;
