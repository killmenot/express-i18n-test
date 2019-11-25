'use strict';

const express = require('express');
const { homeController } = require('../controllers');

module.exports = () => {
  const router = express.Router();

  router.get('/', homeController.index);

  return router;
};
