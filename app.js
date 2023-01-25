const express= require('express');
const db= require("./database/db")
const dotenv = require('dotenv');
const cookieParser= require("cookie-parser")

dotenv.config({path:'./config.env'})

const connectDatabase = require("./database/db.js");
const app = express();



app.use(express.json());
app.use(cookieParser())
connectDatabase();
// db();
const AdminUser = require("./routes/adminUserRoute.js")

app.use("/", AdminUser);


module.exports = app;