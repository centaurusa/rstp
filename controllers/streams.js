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
        console.log('add stream err', err);
    }

};

exports.getStreams = async (req, res, next) => {
    const { email } = req.headers;
    try {
        const user = await User.findOne({ email });
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
        console.log('get streams err', err);
    }
};