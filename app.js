require('dotenv').config();
const dbConnect = require('./db/dbConnect');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authRoutes = require('./routes/authRoute');
const jobRoutes = require('./routes/jobRoute');


app.use(bodyParser.json());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(dbConnect);

const PORT = process.env.PORT || 3000;

const start = async(req, res) => {
   try {
    await dbConnect(process.env.MONGO_URI);

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT} ...`);
    });

   } catch (error) {
       console.log(error)
   }
}

start();