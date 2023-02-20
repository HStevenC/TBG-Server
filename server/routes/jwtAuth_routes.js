const express = require('express');
const router = express.Router();
const jwtAuth_controller = require('../controllers/jwtAuth_controller');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorize");

router.route('/register')
    .post(validInfo, jwtAuth_controller.register);
router.route('/login')
    .post(validInfo, jwtAuth_controller.login);
router.route('/is-verify')
    .get(authorization, jwtAuth_controller.isVerify);

module.exports = router;