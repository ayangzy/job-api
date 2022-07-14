const Job = require('../models/jobModel');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');


exports.getAlljobs = async(req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK)
    .send({status: 'success', message: 'Jobs retrieved successfully', data: jobs, count: jobs.length})
}

exports.createJob = async(req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED)
    .send({status: 'success', message: 'Job created successfully', data: job})
}

exports.getJob = async(req, res) => {
    const jobId = req.params.id;
    const user = req.user.userId;
    const job = await Job.findOne({ _id: jobId, createdBy: user})
    if(!job ){
        throw new NotFoundError(`Job with the specifed Id ${jobId} does not exist`);
    }
    res.status(StatusCodes.OK)
    .send({status: 'success', message: 'Jobs retrieved successfully', data: job})
}

exports.updateJob = async(req, res) => {

    const { company, position } = req.body

    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }

    const jobId = req.params.id
    const user = req.user.userId
    const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: user}, req.body, { new: true, runValidators: true })

    if(!job ){
        throw new NotFoundError(`Job with the specifed Id ${jobId} does not exist`);
    }
    res.status(StatusCodes.OK)
    .send({status: 'success', message: 'Jobs updated successfully', data: job})
}

exports.deleteJob = async(req, res) => {
    const jobId = req.params.id
    const user = req.user.userId
    const job = await Job.findByIdAndDelete({_id: jobId, createdBy: user})

    if (!job) {
        throw new NotFoundError(`Job with the specifed Id ${jobId} does not exist`)
      }
      res.status(StatusCodes.OK).send({status: 'success', message: 'Jobs deleted successfully'})
}
