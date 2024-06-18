const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT | 8089;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./routes/ez_routes');
app.use(bodyParser.json())
app.use(routes);

// Testing API

app.get('/', (req, res) => {
    res.send("This is RoomEZ API testing..");
});


app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server running on Port => ${PORT}`);
    console.log('====================================');
});
