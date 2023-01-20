const UserModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env
const { validationResult } = require('express-validator');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 12)
    
        const newUser = new UserModel({ email, password : hashedPassword })
        await newUser.save()
    
        const token = jwt.sign({ email }, TOKEN_KEY)
    
        return res.status(201).json({
            message : "User was created.",
            user : newUser,
            token
        }) 
    } catch (err) {
        return res.json({
            message : "Login operation was failed!",
            error : err
        })
    }
}
exports.signup = async (req, res, next) => {
    try {
        const erros = validationResult(req)

        if(!erros.isEmpty()) {
            return res.json({ message : "Data is not valid!" })
        }

        const { email, password } = req.body

        const validUser = await UserModel.findOne({ email })

        if(!validUser) {
            return res.json({ message : "Email is not valid!" })
        }

        const validPassword = await bcrypt.compare(password, validUser.password)

        if(!validPassword) {
            return res.json({ message : "Password is not valid!" })
        }

        const token = jwt.sign({ email }, TOKEN_KEY)

        return res.status(200).json({
            message : "Logged in.",
            token
        })
    } catch (err) {
        return res.json({
            message : "Signup operation was failed!",
            error : err
        })
    }
}
exports.getAll = async (req, res, next) => {
    try {
        const users = await UserModel.find({})

        return res.json({ users })
    } catch (err) {
        return res.json({ message : "All users were not gotten!" })
    }
}
exports.getById = async (req, res, next) => {
    try {
        const { userId } = req.params

        const user = await UserModel.findOne({ _id : userId })

        return res.json({ user })
    } catch (err) {
        return res.json({ message : "The user was not gotten!" })
    }
}
exports.updateById = async (req, res, next) => {
    try {
        const { userId } = req.params

        const updatedUser = await UserModel.updateOne({ _id : userId }, { $set : {...req.body} })

        return res.status(200).json({
            message : "The user was updated.",
            updatedUser
        })
    } catch (err) {
        return res.json({ message : "The user was not updated!" })
    }
}
exports.deleteById = async (req, res, next) => {
    try {
        const { userId } = req.params

        const user = await UserModel.findOne({ _id : userId })
        await user.remove()

        return res.status(200).json({
            message : "The user was deleted.",
            user
        })
    } catch (err) {
        return res.json({ message : "The user was not deleted!" })
    }
}
exports.deleteAll = async (req, res, next) => {
    try {
        await UserModel.deleteMany({})

        const users = await UserModel.find({})

        return res.status(200).json({
            message : "All users were deleted.",
            users
        })
    } catch (err) {
        return res.json({ message : "All users were not deleted!" })
    }
}