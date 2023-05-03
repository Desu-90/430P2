const mongoose = require('mongoose');

const FlashSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  jWord: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

<<<<<<< HEAD
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
=======
  quizId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Quiz'
>>>>>>> 09c35d956a790a2a894739df9d6dfa1985236ca3
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

FlashSchema.statics.toAPI = (doc) => ({
  word: doc.word,
  jWord: doc.jWord,
});

const FlashModel = mongoose.model('Flash', FlashSchema);
module.exports = FlashModel;
