require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const dbConnect = require('./db/dbConnect');
const bodyParser = require('body-parser');


const authRoutes = require('./routes/authRoute');
const jobRoutes = require('./routes/jobRoute');


const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(bodyParser.json());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 3000;

const start = async() => {
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