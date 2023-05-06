// const models = require('../models');

// const { Quiz, Card } = models;

// const makeQuiz = async (req, res) => {
//   if (!req.body.title || !req.body.public) {
//     return res.status(400).json({ error: 'Title and Privacy must be chosen before moving forward' });
//   }

//   const quizData = {
//     title: req.body.title,
//     public: req.body.public,
//     cards: [],
//   };

//   try {
//     const newQuiz = new Quiz(quizData);
//     newQuiz.save();
//     return res.status(201).json({ quiz: newQuiz });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error creating quiz!' });
//   }
// };

// const getQuizzes = async (req, res) => {
//   try {
//     const query = { owner: req.session.account._id };
//     const docs = await Quiz.find(query).select('title public').lean().exec();

//     return res.json({ quizzes: docs });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error retrieving quizzes!' });
//   }
// };

// const getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.quizId);
//     if (!quiz) {
//       return res.status(404).json({ error: 'Quiz not found!' });
//     }
//     return res.json({ quiz });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error getting quiz!' });
//   }
// };

// const addCardToQuiz = async (req, res) => {
//   const { quizId } = req.params;
//   const { cardId } = req.body;

//   try {
//     const quiz = await getQuizById(quizId, req.session.account._id);
//     const card = await Card.findById(cardId);

//     if (!card) {
//       return res.status(404).json({ error: 'Card not found!' });
//     }

//     quiz.cards.push(card);
//     await quiz.save();

//     return res.status(201).json({ message: 'Card added to quiz successfully!' });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error adding card to quiz!' });
//   }
// };

// const removeCardFromQuiz = async (req, res) => {
//   try {
//     const { quizId, cardId } = req.params;

//     const quiz = await getQuizById(quizId, req.session.account._id);

//     const indexToRemove = quiz.cards.indexOf(cardId);

//     if (indexToRemove === -1) {
//       return res.status(404).json({ error: 'Card not found in quiz' });
//     }

//     quiz.cards.splice(indexToRemove, 1);

//     await quiz.save();

//     return res.status(200).json({ message: 'Card removed from quiz!' });
//   } catch (err) {
//     console.log(err);
//     return res.statsu(500).json({ error: 'Error removing card from quiz!' });
//   }
// };

// module.exports = {
//   makeQuiz,
//   getQuizzes,
//   getQuizById,
//   addCardToQuiz,
//   removeCardFromQuiz,
// };
