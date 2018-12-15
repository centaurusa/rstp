const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('The email is not valid.')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists in the data base');
                    }
                })
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 5})
], authController.signUp);

router.post('/login', authController.login)

module.exports = router;