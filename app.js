const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(bodyParser.json());

app.get("/job-api", (req, res, next) => {
    res.send("<h1>Hello welcome to our job api board</h1>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} ...`);
});