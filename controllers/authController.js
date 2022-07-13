const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

exports.register = async(req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    
    res.status(StatusCodes.CREATED).send({status: 'success', data: {
    user: { name: user.name, email: user.email }, 
    accessToken: token } })
}


exports.login = async(req, res, next) => {
    res.send("login..");
}