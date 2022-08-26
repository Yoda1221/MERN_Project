const bcrypt        = require('bcrypt')
const jwt           = require('jsonwebtoken')
const User          = require('../models/User')
const asyncHandler  = require('express-async-handler')

/**
 ** @desc   Login
 ** @route  POST /auth
 ** @access Public
 */
const login = asyncHandler(async (req, res) => {

    const { userName, password } = req.body

    if (!userName || !password) return res.status(400).json({ message: 'All fields are required' })

    const foundUser = await User.findOne({ userName }).exec()

    if (!foundUser || !foundUser.active) return res.status(401).json({ message: 'Unauthorized' })

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign({
            "UserInfo": {
                "userName": foundUser.userName,
                "roles": foundUser.roles
            }
        },
        process.env.ACCTOKENSECRET,
        { expiresIn: '1m' }
    )

    const refreshToken = jwt.sign(
        { "userName": foundUser.userName },
        process.env.REFTOKENSECRET,
        { expiresIn: '1d' }
    )

    //** CREATE SECURE COOKIE WITH REFRESH TOKEN 
    res.cookie(process.env.COOKIENAME, refreshToken, {
        httpOnly: true,                 //? accessible only by web server 
        secure: true,                   //? https
        sameSite: 'None',               //? cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //? cookie expiry: set to match rT
    })

    //** SEND ACCESTOKEN CONTAINING userName AND roles 
    res.json({ accessToken })
})

/**
** @desc    Refresh
** @route   GET /auth/refresh
** @access  Public - because access token has expired
*/
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.MERN_Project) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.MERN_Project

    jwt.verify(refreshToken, process.env.REFTOKENSECRET, asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'FORBIDDEN!' })

            const foundUser = await User.findOne({ userName: decoded.userName }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign({
                    "UserInfo": {
                        "username": foundUser.userName,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCTOKENSECRET,
                { expiresIn: '1m' }
            )

            res.json({ accessToken })
        })
    )
}

/**
** @desc    Logout
** @route   POST /auth/logout
** @access  Public - just to clear cookie if exists
*/
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.MERN_Project) return res.sendStatus(204) //?  NO CONTENT
    res.clearCookie(process.env.COOKIENAME, { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'COOKIE CLEARED!' })
}

module.exports = {
    login,
    refresh,
    logout
}
