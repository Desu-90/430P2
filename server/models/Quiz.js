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

  id: {
    type: Number,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  public: {
    bool: true,
  },
});

QuizSchema.statics.toAPI = (doc) => ({
    quizName: doc.quizName,
    id: doc.id,
    words: doc.words,
});

const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;
