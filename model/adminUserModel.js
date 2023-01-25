const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const adminUserSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        required:true
    },
    department:{
        type:String,
        
    },
    createdTime:{

    },
    updatedTime:{

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,


})

adminUserSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }

    this.password= await bcrypt.hash(this.password,10);
})

adminUserSchema.methods.getJWToken= function(){

    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,

    })

}



adminUserSchema.methods.comparePassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports= mongoose.model("adminUser", adminUserSchema);