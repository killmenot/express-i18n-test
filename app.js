'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const i18n = require('i18n');
const configureRoutes = require('./routes/index');

i18n.configure({
  locales:['ru', 'en'],
  defaultLocale: 'ru',
  directory: __dirname + '/locales',
  updateFiles: false
});

const app = express();

// trust first proxy
app.set('trust proxy', 1);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(i18n.init);

// routes
app.use('/', configureRoutes());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(500);
  res.render('error');
});

module.exports = app;
