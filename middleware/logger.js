const { format } = require('date-fns');
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvent = async (message, logFile) => {
    const dataTime = `${format(new Date(), 'yyyymmdd\tHH:MM:SS')}`
    const logItem = `${dataTime}\t${uuid()}\t${message}`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem)
    }
    catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin} \n`, 'reqlog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvent, logger }
