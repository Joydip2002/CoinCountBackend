const { Sequelize, Op, QueryTypes } = require('sequelize');
const models = require('../models');

async function coincountSignup(req, res){
    if (!models.users) {
        return res.status(500).json({ error: "Model 'users' is not defined" });
    }
    try {
        const req_data = {
            name: req.body.name.trim() || "",
            email: req.body.email || "",
            password: req.body.password || "",
            cpassword: req.body.cpassword || ""
        };
        console.log("User Name: ", req_data.name);
        if (!req_data.email || !req_data.password || req_data.password !== req_data.cpassword) {
            res.status(200).json({
                status: 401,
                msg: "password mismatch",
                data: { req_data }
            });
        }else{
            // Check if the user already exists
            const checkUser = await models.users.findOne({
                where: { email: req_data.email }
            });
            if (checkUser) {
                res.status(200).json({
                    status: 401,
                    msg: "User already exists",
                    data: req_data
                });
            } else { 
                const createUser = await models.users.create(req_data);       
                res.status(200).json({
                    status: 200,
                    msg: "Registration successful",
                    data: req_data
                });
            }
        }
    }catch (error) {
        console.error("Error occurred - coincountSignup: ", error);
        res.status(500).json({
            status: 500,
            msg: "Error occurred - coincountSignup: Post API"
        });
    }
}

async function coinCountLogin(req,res){
    try{
        const req_data={
            email:req.body.email || "",
            password:req.body.password || ""
        }
        console.log(req_data.email);
        console.log(req_data.password);
        
        if(req_data.email=="" || req_data.password==""){
            res.status(400).json({
                status: 400,
                msg: "Invalid input fields are provided.",
                data: { req_data }
            })
        }else{
            const user=await models.users.findOne({
                where:{email : req_data.email, password : req_data.password}
            })
            if(user){
                res.status(200).json({
                    status: 200,
                    msg: "Login successfull",
                    data: req_data
                })
            }else{
                res.status(200).json({
                    status: 400,
                    msg: "Invalid credentials!",
                    data: req_data
                })
            }
        }
    }catch (error) {
        console.error("Error occurred - coinCountLogin: ", error);
        return res.status(500).json({
            status: 500,
            msg: "Error occurred - coinCountLogin: Post API"
        });
    }
}

async function addTransactions(req,res){
    try{
        const req_data={
            transaction_type:req.body.type || "",
            amount:req.body.amount || 0,
            user_id:req.body.user_id || 0,
            category:req.body.category || "",
            description:req.body.description || ""
        };
        if(req_data.user_id >0){
            if(req_data.category!=""){
                if(req_data.amount > 0){
                    const createTansaction = await models.user_transactions.create(req_data);
                    if(createTansaction){
                        res.status(200).json({
                            'status':200,
                            'msg':'Transaction successfull',
                            data:req_data
                        });
                    }else{
                        res.status(400).json({
                            'status':400,
                            'msg':'Transaction could not be completed' 
                        });
                    }
                }else{
                    res.status(400).json({
                        'status':400,
                        'msg':'Amount can not be negative value' 
                    });
                }
            }else{
                res.status(400).json({
                    'status':400,
                    'msg':'please choose category' 
                });
            }
        }else{
            res.status(400).json({
                'status':400,
                'msg':'user not found!' 
            });
        }
    }catch(error) {
        console.error("Error occurred - addTransactions: ", error);
        return res.status(500).json({
            status: 500,
            msg: "Error occurred - addTransactions: Post API"
        });
    }
}

async function updateUsersMoney(req,res){
    try{
        const req_data={
            user_id:req.body.user_id || 0,
            income:req.body.income || 0,
            expense:req.body.expense || 0,
            saving:req.body.saving || 0,
        }
        if(req_data.user_id > 0){
            if(req_data.income >= 0){
                const userMoney = await models.user_money_info.findOne({
                    where:{user_id : req_data.user_id}
                });
                // console.log(userMoney);
                if(!userMoney){
                    await models.user_money_info.create(req_data);
                    res.status(200).json({
                        'status':200,
                        'msg':'creation successfull',
                        'data':req_data 
                    });
                }else{
                    await models.user_money_info.update(req_data, {
                        where: { user_id: req_data.user_id }
                    });
                    res.status(200).json({
                        status: 200,
                        msg: 'Update successful',
                        data: req_data
                    });
                }
                
            }else{
                res.status(400).json({
                    'status':400,
                    'msg':'Amount can not be negative value' 
                });
            }
        }else{
            res.status(400).json({
                'status':400,
                'msg':'user not found!' 
            });
        }
    }catch (error) {
        console.error("Error occurred - updateUsersMoney: ", error);
        res.status(500).json({
            status: 500,
            msg: "Error occurred - updateUsersMoney: Post API"
        });
    }
}

async function fetchUserIdByEmail(req,res){
    try{
        const user_email = req.body.email || "";
        if(user_email!=""){
            const findUser=await models.users.findAll({
                where:{email:user_email}
            });
            if(findUser!=""){
                res.status(200).json({
                    'status':200,
                    'data':findUser
                })
            }else{
                res.status(200).json({
                    'status':200,
                    'msg':"Email not exists"
                })
            }
        }else{
            res.status(200).json({
                'status':200,
                'msg':"email is required"
            })
        }
    }catch (error) {
        console.error("Error occurred - fetchUserIdByEmail: ", error);
        res.status(500).json({
            status: 500,
            msg: "Error occurred - fetchUserIdByEmail: Post API"
        });
    }
}

async function fetchTransactions(req,res){
    try {
        if(req.params.user_id>0){
            const allTransactionsData=await models.user_transactions.findAll({
                where:{user_id:req.params.user_id},
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({
                'status':200,
                'msg':'fetching successful',
                'data':allTransactionsData
            });
        }else{
            res.status(400).json({
                'status':400,
                'msg':'user not found!' 
            });
        }
    }catch (error) {
        console.error("Error occurred - fetchTransactions: ", error);
        res.status(500).json({
            status: 500,
            msg: "Error occurred - fetchTransactions: Get API"
        });
    }
}

async function fetchIncomeExpenseDetails(req,res) {
    try{
        var response={};
        if(req.params.userId>0){
            const userCheck = await models.users.findOne({
                where:{id:req.params.userId}
            })
            if(userCheck){
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                const endOfMonth = new Date(startOfMonth);
                endOfMonth.setMonth(startOfMonth.getMonth() + 1);

                // SELECT SUM(amount) AS Expense FROM `user_transactions` WHERE transaction_type='expense' AND user_id=3
                const totalExpense = await models.user_transactions.sum('amount', {
                    where: {
                        user_id: req.params.userId,
                        transaction_type: 'expense',
                        createdAt: {
                            [Op.between]: [startOfMonth, endOfMonth]
                        }
                    }
                });
                // income
                const totalIncome = await models.user_transactions.sum('amount', {
                    where: {
                        user_id: req.params.userId,
                        transaction_type: 'income',
                        createdAt: {
                            [Op.between]: [startOfMonth, endOfMonth]
                        }
                    }
                });
                response={
                    'status':200,
                    'msg':'fetched successfully',
                    'details':{
                        'expense':totalExpense??0,
                        'income':totalIncome??0
                    }
                }
            }else{
                response={
                    'status':400,
                    'msg':'user not exists'
                }
            }
        }else{
            response={
                'status':400,
                'msg':"Invalid UserId"
            }
        }
        res.json({
            data:response
        })
    }catch (error) {
        console.error("Error occurred - fetchIncomeExpenseDetails: ", error);
        res.status(500).json({
            status: 500,
            msg: "Error occurred - fetchIncomeExpenseDetails: Get API"
        });
    }
}

async function todayTransactionDetails(req,res){
    try {
        var response={};
        if(req.params.userId>0){
            var userId= req.params.userId;
            const userCheck = await models.users.findOne({
                where:{id:req.params.userId}
            })
            if(userCheck){
                var today = new Date();
                var formattedDate = today.toISOString().split('T')[0];
                var timestamp = formattedDate;
                var datePart = timestamp.split(' ')[0];
                const todayTransactionsData = await models.sequelize.query(`
                    SELECT 
                        id, 
                        transaction_type, 
                        amount, 
                        user_id, 
                        category, 
                        description, 
                        createdAt, 
                        updatedAt 
                    FROM user_transactions 
                    WHERE DATE(updatedAt) = :datePart
                      AND user_id = :userId
                    ORDER BY id DESC 
                `, {
                    replacements: { userId, datePart },
                    type: QueryTypes.SELECT
                });
                response={
                    'status':200,
                    'msg':'fetched successfully',
                    'details': todayTransactionsData
                }
            }else{
                response={
                    'status':400,
                    'msg':'user not exists'
                }
            }
        }else{
            response={
                'status':400,
                'msg':"Invalid UserId"
            }
        }
        res.json({
            data:response
        })
    } catch (error) {
        console.error("Error occurred - todayTransactionDetails: ", error);
        res.status(500).json({
            status: 500,
            msg: "Error occurred - todayTransactionDetails: Get API"
        });
    }
}

module.exports = {
    // getAllUsers:getAllUsers
    coincountSignup:coincountSignup,
    coinCountLogin:coinCountLogin,
    addTransactions:addTransactions,
    updateUsersMoney:updateUsersMoney,
    fetchTransactions:fetchTransactions,
    fetchUserIdByEmail:fetchUserIdByEmail,
    fetchIncomeExpenseDetails:fetchIncomeExpenseDetails,
    todayTransactionDetails:todayTransactionDetails
};