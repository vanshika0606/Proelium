const express = require("express");

const {register, login, logout}= require("../controllers/adminUserController")
const {isAuthenticatedUser} = require("../Auth/auth.js");


const router = express.Router();


router.route("/").post(register)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticatedUser,logout)



module.exports= router