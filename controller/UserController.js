const User = require('../models/User')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    const data = await User.find().select(-password).lean()
    res.send(data)
}

const createUser = async (req, res) => {
    const payload = req.body;
    const result = await User.insertMany(payload);
    res.send(payload)
}

module.exports = { getUsers }