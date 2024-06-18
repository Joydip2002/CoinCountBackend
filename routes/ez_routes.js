const express = require("express")
const models = require('../models')
const usersControler = require('../controllers/users.controller')
const router = express.Router();

//get all users
router.get("/getAllUsers",usersControler.getAllUsers);


module.exports = router