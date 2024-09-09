const express = require("express")
const usersControler = require('../controllers/users.controller')
const router = express.Router();

//get all users
router.post("/signup",usersControler.coincountSignup);
router.post("/login",usersControler.coinCountLogin);

router.post("/addTansactions",usersControler.addTransactions);
router.post("/updateUsersMoney",usersControler.updateUsersMoney);
router.get("/fetchTransactions/:user_id",usersControler.fetchTransactions);


module.exports = router