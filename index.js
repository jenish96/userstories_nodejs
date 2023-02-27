const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvent } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookie = require('cookie-parser')
const cors = require('cors')
const mongodb = require('./config/mongodb');
const { default: mongoose, mongo } = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT

app.use(express.json());
app.use(logger)
app.use(cors())
app.use(errorHandler)
app.use(cookie())
mongodb()
// app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/route'))

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`)
    })
    console.log('DB is connected!')
})

mongoose.connection.on('error', err => {
        logEvent(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,'dbErrorlog.log')
        console.log(err)
})
