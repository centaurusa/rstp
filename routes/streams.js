const express = require('express');

const router = express.Router();

const userController = require('../controllers/streams');
const isAuth = require('../middleware/is-auth');

router.put('/', isAuth, userController.addStream);

router.get('/', isAuth, userController.getStreams);

module.exports = router;