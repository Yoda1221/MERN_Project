const cors          = require('cors')
const http          = require('http')
const path          = require('path')
const colors        = require('colors')
const express       = require('express')
const mongoose      = require('mongoose')
const cookieParser  = require('cookie-parser')
const corsOptions   = require('./services/corsOptions')
const dbConnect     = require('./services/dbConn')
const errorHandler  = require('./middlewares/ErrorHandler')
const { logEvents, logger } = require('./middlewares/Logger')
require('dotenv').config()

const app           = express()
const httpServer    = http.createServer(app)

dbConnect()

app.use(logger)
app.use(cors(/* corsOptions */)) // Cross Origin Resource Sharing
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/routes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)
const PORT          = process.env.PORT || 5031 //** 5030

//app.listen(PORT, () => console.log(`SERVER IS RUNNUNG ON PORT ${PORT}`))

mongoose.connection.once('open', () => {
    console.log(`\n\n|-O-|\n\nCONNECTED TO MONGODB\t${colors.gray(new Date())}\n\n`.yellow)
    
})

httpServer.listen( PORT, () => {
    logEvents(`SERVER IS RUNNING ON PORT: ${PORT}`, 'serverRunLog.txt')
    console.log(`\n\n|-O-|\n\nSERVER IS RUNNING ON PORT: ${PORT.brightCyan.bold}\t${colors.gray(new Date())}\n\n`.yellow)
})

mongoose.connection.on('error', err => {
    console.log('MONGOOSE DB CONNECT ERROR')
    logEvents('MONGOOSE DB CONNECT ERROR', 'mongoDbLog.txt')
})
