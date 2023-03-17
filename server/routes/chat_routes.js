const express = require('express');
const router = express.Router();
const chat_controller = require('../controllers/chat_controller');

router.route('/choice')
    .post(chat_controller.output)
router.route('/start')
    .post(chat_controller.start)

module.exports = router;

