const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getCards', mid.requiresLogin, controllers.Card.getCards);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Card.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Card.makeCard);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/changepassword', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePassword);
  app.delete('/delete', mid.requiresLogin, controllers.Card.deleteCard);

  app.post('/quiz', mid.requiresLogin, controllers.Quiz.makeQuiz);
  app.get('/getQuiz', mid.requiresLogin, controllers.Quiz.getQuizzes);
  app.get('/quiz', mid.requiresLogin, controllers.Quiz.getQuizById);
  app.post('/addCard', mid.requiresLogin, controllers.Quiz.addCardToQuiz);
  app.delete('/removeCard', mid.requiresLogin, controllers.Quiz.removeCardFromQuiz);
};

module.exports = router;
