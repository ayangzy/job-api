const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

exports.register = async(req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).send({status: 'success', message: 'User successfully SignedUp', data: {
    user: { name: user.name, email: user.email }, 
    accessToken: token } })
}


exports.login = async(req, res, next) => {

    const { email, password } = req.body;
    if(!email || !password){
        throw new BadRequestError('Please enter your email and password');
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).send({status: 'success', message: 'User successfully SignedIn', data: {
    user: { name: user.name, email: user.email }, 
    accessToken: token } })

}