const bcrypt        = require('bcrypt')
const User          = require('../models/User')
const asyncHandler  = require('express-async-handler')

/**
 ** GET ALL USERS FROM DATABASE
 *
 ** @route  GET     /users
 ** @access Private 
 */
const getAllUsers = asyncHandler( async (req, res) => {
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
const cerateUser = asyncHandler( async (req, res) => {
    const { userName, email, password, roles } = req.body
    let uniques = { userName, email }
    let uniqArr = []
    //** CONFIRM DATAS
    if (!userName || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "MISSING DATA!" })
    }
    //** CHECK IS THE DATA IN THE DATABASE
    const checkData = await User.findOne({ userName }).lean().exec()
    if (checkData) return res.status(409).json({ message: "USERNAME IS DUPLICATED!" })

    /* uniques = Object.entries(uniques)
    try {
        uniques.forEach( async unique => {
            const checkObj = { [unique[0]]: unique[1] }
            const checkUnique = await User.findOne( checkObj ).lean().exec()
            console.log('checkUnique ', checkUnique)
            if (checkUnique !== null) {
                uniqArr.push(`${unique[0]} IS DUPLICATED!`)
                console.log(`${unique[0]} IS DUPLICATED!`)
                return res.status(409).json({ message: `${unique[0]} IS DUPLICATED!` })
            }
        })
    } catch (e) { 
        console.log('CHECK UNIQUE USER DATA ERROR ', e.message)
    } */
    //** HASH PASWORD
    const hashedPass = await bcrypt.hash(password, 10)
    const userObject = { userName, email, "password": hashedPass, roles }
    //** SAVE USER TO DATABASE
    const user = await User.create(userObject)
    if (user) res.status(201).json({ message: `${userName} IS CREATED!` })
    else res.status(400).json({ message: "INVALID USER DATA RECEIVED!" })
    res.send("ddd")
})

/**
 ** UPDATE A USER
 *
 ** @route  PATCH   /users
 ** @access Private 
 */
const updateUser = asyncHandler( async (req, res) => {
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
const deleteUser = asyncHandler( async (req, res) => {
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
