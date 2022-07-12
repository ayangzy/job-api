const express = require('express');

const router = express.Router();
const jobControlelr = require('../controllers/jobController');

router
    .route('')
    .get(jobControlelr.getAlljobs)
    .post(jobControlelr.createJob)

router
    .route(':/id')
    .get(jobControlelr.getJob)
    .patch(jobControlelr.updateJob)
    .delete(jobControlelr.deleteJob)


module.exports = router