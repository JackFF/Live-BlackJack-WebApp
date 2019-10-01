const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//  Load user model
require('../models/User');
const User = mongoose.model('users');

//  User login route
router.get('/login', (req, res) => {

    res.render('users/login');
});

//  User register route
router.get('/register', (req, res) => {

    res.render('users/register');
});



//  User logout route
router.get('/logout', (req, res) => {

    req.logout();
    res.redirect('/');
});

module.exports = router;