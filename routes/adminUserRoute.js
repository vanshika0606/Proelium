const express = require("express");

const {register, login, logout, Add, View, update}= require("../controllers/adminUserController")
const {isAuthenticatedUser} = require("../Auth/auth.js");


const router = express.Router();


router.route("/").post(register)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticatedUser,logout)
router.route("/add").post(isAuthenticatedUser,Add)
router.route("/view").get(isAuthenticatedUser,View)
router.route("/update/:id").put(isAuthenticatedUser,update)



module.exports= router