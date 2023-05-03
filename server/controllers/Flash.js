const models = require('../models');

const { Flash } = models;

const makeFlash = async (req, res) => {
  if (!req.body.word || !req.body.jword) {
    return res.status(400).json({ error: 'Please fill out all the fields' });
  }

  const flashData = {
    word: req.body.word,
    jword: req.body.jword,
    owner: req.session.account._id,
  };

  try {
    const newFlash = new Flash(flashData);
    newFlash.save();
    return res.status(201).json({ word: newFlash.word, jword: newFlash.jword })
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Flashcard already exists' });
    }
    return res.status(500).json({ error: 'An error occured making the flashcard' });
  }
};

const flashcardMakerPage = async (req, res) => res.render('app');

const getFlashcards = async (req, res) => {
  try {
    const query = { owner: req.session.account._id};
    const docs = await Flash.find(query).select('word jword').lean().exec();

    return res.json({ words: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving flashcards!' });
  }
};

module.exports = {
  flashcardMakerPage,
  makeFlash,
  getFlashcards,
};
