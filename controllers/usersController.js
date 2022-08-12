const bcrypt        = require('bcrypt')
const User          = require('../models/User')
const asyncHAndler  = require('express-async-handler')

/**
 ** GET ALL USERS FROM DATABASE
 *
 ** @route  GET     /users
 ** @access Private 
 */
const getAllUsers = asyncHAndler( async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: "NO USERS FOUND!" })
    }
    res.json({ users })
})

/**
 ** CREATE NEW USER "62f559f83b8fa31beec8b195"
 *
 ** @route  POST    /users
 ** @access Private 
 */
const cerateUser = asyncHAndler( async (req, res) => {
    const { userName, email, password, roles } = req.body

    //** CONFIRM DATAS
    if (!userName || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "MISSING DATA!" })
    }

    //** CHECK IS THE DATA IN THE DATABASE
    const checkData = await User.findOne({ userName }).lean().exec()
    if (checkData) {
        return res.status(409).json({ message: "USERNAME IS DUPLICATED!" })
    }

    //** HASH PASWORD
    const hashedPass = await bcrypt.hash(password, 10)
    const userObj = { userName, email, "password": hashedPass, roles }

    //** SAVE USER TO DATABASE
    const user = await User.create(userObj)
    if (user) {
        res.status(201).json({ message: `${userName} IS CREATED!` })
    } else {
        res.status(400).json({ message: "INVALID USER DATA RECEIVED!" })
    }

})

/**
 ** UPDATE A USER
 *
 ** @route  PATCH   /users
 ** @access Private 
 */
const updateUser = asyncHAndler( async (req, res) => {
    const { id, userName, email, roles, active } = req.body
    
    //** CONFIRM DATAS
    if (!id || !userName || !email || !active || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "MISSING DATA!" })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "USER NOT FOUND!" })
    }
    //** CHECK IS THE DATA IN THE DATABASE
    const checkData = await User.findOne({ userName }).lean().exec()
    if (checkData && checkData?._id.toString() !== id) {
        return res.status(409).json({ message: "USERNAME IS DUPLICATED!" })
    }
    user.roles      = roles
    user.email      = email
    user.active     = active
    user.userName   = userName
    
    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.userName} IS UPDATED!` })
})


/**
 ** DELETE A USER
 *
 ** @route  DELETE  /users
 ** @access Private 
 */
const deleteUser = asyncHAndler( async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: "USER ID IS REQUIRED!" })
    }
    // TODO: DELETE DATA ABOUT ALL USERS FROM ALL BOARDS IF POSSIBLE
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "USER NOT FOUND!" })
    }
    const result = await user.deleteOne()
    const replay = `USERNAME ${result.userName} WITH ID ${result._id} DELETED!`
    res.json({ replay })
})

module.exports = {
    getAllUsers,
    cerateUser,
    updateUser,
    deleteUser
}
