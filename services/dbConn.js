const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(`DB CONNECT ERROR `, error)
        logEvents('MONGOOSE DB CONNECT ERROR', 'mongoDbLog.txt')
    }
}

module.exports = dbConnect
