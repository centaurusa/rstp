const express = require('express');

const router = express.Router();

const userController = require('../controllers/streams');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, userController.getUserStreams);

module.exports = router;