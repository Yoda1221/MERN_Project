const jwt           = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCTOKENSECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'FORBIDDEN!' })
            req.user    = decoded.UserInfo.userName
            req.roles   = decoded.UserInfo.roles
            next()
        }
    )

}

module.exports = verifyToken
