'use strict';

module.exports = {
  index: (req, res) => {

    // test
    // res.locals.setLocale('en'); - default
    // res.locals.setLocale('ru');
    
    // GOAL: to render strings as
    // base with A, B and C
    // or
    // base with A and B

    res.render('index');
  },
};
