const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const router = express.Router();
const UserController = require('../controller/UserController')
const path = require('path')
const { ObjectId } = require('mongodb');

// router.get('^/$|/index(.html)', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
// })

router.get('/get', async (req, res) => {
    const data = await User.find().select('-password');
    res.send(data)
})

router.post('/add', async (req, res) => {
    const payload = req.body
    payload.password = bcrypt.hashSync(payload.password, 10)
    const result = await User.insertMany(payload)
    res.send(result)
})

router.patch('/update', async (req, res) => {
    const payload = req.body
    const result = await User.updateOne({ _id: new ObjectId(req.body.id) }, { $set: payload })
    res.send(result)
})

router.delete('/delete', async (req, res) => {
    const payload = req.body
    const result = await User.deleteOne({ _id: new ObjectId(payload.id) })
    res.send(result)
})

router.route('/')
    .get(UserController.getUsers)

module.exports = router