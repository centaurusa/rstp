const User = require('../models/user');

exports.addStream = async (req, res, next) => {
    const { email, stream } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            user.streams.push({
                url: stream
            });
            user.save();
            res.status(201).json({
                message: 'Updated',
                streams: user.streams
            });
        } else {
            res.status(404).json({
                message: 'Doc not found'
            });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.getStreams = async (req, res, next) => {
    const { _id } = req.headers;
    
    try {
        const user = await User.findById({ _id }, { streams: { $slice: -8 } });
        if (user) {
            res.status(200).json({
                streams: user.streams
            });
        } else {
            res.status(404).json({
                message: 'Doc not found'
            })
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};