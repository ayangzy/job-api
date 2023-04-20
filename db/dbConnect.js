const mongoose = require('mongoose')
const {
  MONGO_USER,
  MONGO_PORT,
  MONGO_PASSWORD,
  MONGO_IP,
} = require('../config/config')
mongoose.set('strictQuery', false)

const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

//const url = `mongodb://localhost:27017/job`

const connectDB = () => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('db connection succesful')
    })
    .catch((error) => {
      console.log(error)
      setTimeout(connectDB, 2000)
    })
}

module.exports = connectDB
