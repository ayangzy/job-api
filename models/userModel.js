const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required'],
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        required: [true, 'The email field is required'],
        minLength: 3,
        maxLength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },

    password: {
        type: String,
        required: [true, 'The password field is required'],
        minlength: 6,
    }
});

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function(){
    const token = jwt.sign({userId: this._id, name: this.name, email:this.email}, 
        process.env.JWT_SERCRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    return token;
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);


