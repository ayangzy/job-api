const express = require('express');

const router = express.Router();

const uploadController = require('../controllers/uploadController');

router.route('/upload-product').post(uploadController.uploadProductImageToLocal);

module.exports = router;