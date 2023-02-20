const express = require('express');
const router = express.Router();
const authorization = require("../middleware/authorize");
const dashboard_controller = require('../controllers/dashboard_controller');

router.route('/')
    .get(authorization, dashboard_controller.start);

module.exports = router;