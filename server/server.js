const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.APP_PORT;
const bookRouter = require('./routers/BookRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server is started successfuly on port ${PORT}`);
})

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected successfuly'))
    .catch(() => console.log('Couldn`t connect. Error'));



app.use('/api/v1/book', bookRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);