const express = require('express');
const router = express.Router();
const paystackController = require('../controllers/paystackController');

router.route('/pay').post(paystackController.pay);


module.exports = router;