const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import routers ======================================================================================================
const indexRouter = require('./routes');
const startGameRouter = require('./routes/startGame');
const gameInitializationRouter = require('./routes/gameInitialization');
const validateWordRouter = require('./routes/validateWord');
const saveAndExitRouter = require('./routes/saveAndExit');
const giveUpRouter = require('./routes/giveUp');
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
app.use('/', indexRouter);
app.use('/startGame', startGameRouter);
app.use('/game', gameInitializationRouter);
app.use('/validateWord', validateWordRouter);
app.use('/saveAndExit', saveAndExitRouter);
app.use('/giveUp', giveUpRouter);
app.use('/OK', okRouter);

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
