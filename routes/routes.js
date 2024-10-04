const express = require("express")
const usersControler = require('../controllers/users.controller')
const router = express.Router();

//get all users
router.post("/signup",usersControler.coincountSignup);
router.post("/login",usersControler.coinCountLogin);

router.post("/addTansactions",usersControler.addTransactions);
router.post("/updateUsersMoney",usersControler.updateUsersMoney);
router.post("/fetchUserIdByEmail",usersControler.fetchUserIdByEmail);
router.get("/fetchTransactions/:user_id",usersControler.fetchTransactions);
router.get("/fetchIncomeExpenseDetails/:userId",usersControler.fetchIncomeExpenseDetails);
router.get("/todayTransactionDetails/:userId",usersControler.todayTransactionDetails);

router.post("/addCustomer/:userId",usersControler.addCustomer);
router.get("/fetchCustomerList/:userId",usersControler.fetchCustomerList);

router.post("/addCategory",usersControler.addCategory);
router.get("/fetchCategory",usersControler.fetchCategory);

router.post("/fetchTransactionDetailsSingleUser",usersControler.fetchTransactionDetailsSingleUser);

module.exports = router