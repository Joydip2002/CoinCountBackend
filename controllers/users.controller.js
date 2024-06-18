const models = require('../models');

function getAllUsers(req,res){
    if (!models) {
        return res.status(500).json({ error: "Model is not defined" });
    }
    if (!models.EZ_Users) {
        return res.status(500).json({ error: "Model 'ez' is not defined" });
    }
    models.EZ_Users.findAll()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}

module.exports = {
    getAllUsers:getAllUsers
};