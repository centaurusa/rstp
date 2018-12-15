const User = require('../models/user');

exports.getUserStreams = (req, res, next) => {
    const { email } = req.headers;
    User.findById(email)
        .then(doc => {
            res.status(200).json({
                user: doc
            });
        })
        .catch(err => res.status(200).json({ message: 'No streams were found'}));
};