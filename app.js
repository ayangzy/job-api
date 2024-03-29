require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const dbConnect = require('./db/dbConnect')
const bodyParser = require('body-parser')
// USE V2
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const authenticateUser = require('./middleware/authentication')

//routers
const authRoutes = require('./routes/authRoute')
const jobRoutes = require('./routes/jobRoute')
const uploadRoutes = require('./routes/uploadRoute')
const sendEmailRoute = require('./routes/sendEmailRoute')
const paystackRoutes = require('./routes/paystackRoute')
//error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(bodyParser.json())
app.use(fileUpload({ useTempFiles: true }))

app.get('/', (req, res) => {
  res
    .status(200)
    .send({
      message:
        'Welcome to job api!!! Testing CICD pipele using aws codepipeline',
    })
})
//endpoints
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobRoutes)
app.use('/api/v1/uploads', uploadRoutes)
app.use('/api/v1/emails', sendEmailRoute)
app.use('/api/v1/payments', paystackRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
app.enable('trust proxy')
app.use(cors({}))
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await dbConnect()

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT} ...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
