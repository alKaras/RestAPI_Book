const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = 3001;
const MONGO_URL = `mongodb://127.0.0.1:27017/books`
const bookRouter = require('./routers/BookRouter');

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server is started successfuly on port ${PORT}`);
})

mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected successfuly'))
    .catch(() => console.log('Couldn`t connect. Error'));



app.use('/api/v1/book', bookRouter);