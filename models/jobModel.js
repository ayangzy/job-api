const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
      company: {
        type: String,
        required: [true, 'The company name field is required'],
        maxlength: 50,
      },
      position: {
        type: String,
        required: [true, 'The position field is required'],
        maxlength: 100,
      },
      status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user field is required'],
      },
    },
    { timestamps: true }
  )


module.exports = mongoose.model('Job', JobSchema);