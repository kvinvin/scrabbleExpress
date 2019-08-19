const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import routers ======================================================================================================
const getTopPlayersRouter = require('./routes/getTopPlayers');
const startGameRouter = require('./routes/startGame');
const queryRouter = require('./routes/query');
const getFullGameRouter = require('./routes/getFullGame');
const gameInitializationRouter = require('./routes/gameInitialization');
const validateWordRouter = require('./routes/validateWord');
const saveAndExitRouter = require('./routes/saveAndExit');
const endGameRouter = require('./routes/endGame');
const okRouter = require('./routes/ok');

const app = express();

// view engine setup ===================================================================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes ==============================================================================================================
app.use('/getHighScoreList', getTopPlayersRouter);             //GET, home page request to get highscore list
app.use('/verifyNewGameInput', startGameRouter);            //GET, start a game request
app.use('/searchUserGames', queryRouter);                    //POST, search for a user in the username db and return usr games
app.use('/loadGame', getFullGameRouter);                //get a saved game
app.use('/createGame', gameInitializationRouter);           //initialize a new game state to start a game
app.use('/validateWords', validateWordRouter);               //check if a word is present in the dictionary
app.use('/saveAndExit', saveAndExitRouter);                 //save the game and exit to home page
app.use('/endGame', endGameRouter);                         //update user stats and delete the game if its present in the db
app.use('/OK', okRouter);                                   //backend validation that frontend succeeded, used for debugging

// catch 404 and forward to error handler ==============================================================================
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler =======================================================================================================
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
