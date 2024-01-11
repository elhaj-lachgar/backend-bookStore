const express = require('express');
const router  = express.Router();

const {GetOrdersService} = require("../services/OrderService");


router.get('/' , GetOrdersService);

module.exports = router;