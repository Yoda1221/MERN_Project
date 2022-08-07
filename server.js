const cors          = require('cors')
const http          = require('http')
const path          = require('path')
const express       = require('express')
const cookieParser  = require('cookie-parser')
const corsOptions   = require('./services/corsOptions')
const errorHandler  = require('./middlewares/ErrorHandler')
const { logEvents, logger } = require('./middlewares/Logger')
require('colors')
require('dotenv').config()

const app           = express()

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
const PORT          = process.env.PORT || 5031 // 5030

//app.listen(PORT, () => console.log(`SERVER IS RUNNUNG ON PORT ${PORT}`))

const httpServer    = http.createServer(app)
httpServer.listen( PORT, () => {
    logEvents(`SERVER IS RUNNING ON PORT: ${PORT}`, 'serverRunLog.txt')
    console.log(`\n\n|-O-|\n\nSERVER IS RUNNING ON PORT: ${PORT}\t${new Date()}\n\n`.yellow)
})
