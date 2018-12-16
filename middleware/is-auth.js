const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    let decodedToken;

    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    try {
        decodedToken = jwt.verify(token, 'zxasqw12!fg');
    } catch (err) {
        err.statusCode = 401;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Unauthorised');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};