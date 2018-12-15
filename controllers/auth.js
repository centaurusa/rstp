const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = async (req, res, next) => {
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
        const error = new Error('Validation failed.')
        error.statusCode = 422;
        error.data = errs.array();
        throw error;
    }
    const { email, password } = req.body;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'User created',
                userId: result._id
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let loaderUser;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email was not found.');
                error.statusCode = 401;
                throw error;
            }
            loaderUser = user;
            return bcrypt.compare(password, user.hashedPassword);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // generating web token
            const token = jwt.sign({ 
                    email: loaderUser.email, 
                    userId: loaderUser._id.toString()
                }, 'zxasqw12!fg', { expiresIn: '1h' }
            );
            res.status(200).json({
                token,
                userId: loaderUser._id.toString()
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};