const models = require('../models');

const { Card } = models;

const makeCard = async (req, res) => {
  if (!req.body.eWord || !req.body.jWord) {
    return res.status(400).json({ error: 'English and Japanese words are required to proceed with creating a flashcard' });
  }

  const cardData = {
    eWord: req.body.eWord,
    jWord: req.body.jWord,
    owner: req.session.account._id,
  };

  try {
    const newCard = new Card(cardData);
    newCard.save();
    return res.status(201).json({ eWord: newCard.eWord, jWord: newCard.jWord });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Card already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making card!' });
  }
};

const makerPage = async (req, res) => res.render('app');

const getCards = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Card.find(query).select('eWord jWord').lean().exec();

    return res.json({ cards: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving cards!' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.query.id);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found!' });
    }
    return res.status(200).json({ message: 'Card deleted successfully!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error deleting card!' });
  }
};

module.exports = {
  makerPage,
  makeCard,
  getCards,
  deleteCard,
};
