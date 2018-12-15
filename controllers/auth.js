const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

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