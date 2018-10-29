'use strict';

const express = require('express');
const passport = require('passport');
const options = {session: false, failWithError: true};
const router = express.Router();
const localAuth = passport.authenticate('local', options);

router.post('/', localAuth, function (req, res) {
  return res.json(req.user);
});

module.exports = router;