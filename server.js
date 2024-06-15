const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 8089
const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Middleware

// Testing API
app.get('/',(req,res)=>{
    res.send("This is RoomE APi testing..")
})

app.listen(PORT,()=>{
    console.log('====================================');
    console.log(`Server running on Port => ${PORT}`);
    console.log('====================================');
})