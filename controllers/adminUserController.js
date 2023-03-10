const { findOne, findById } = require("../model/adminUserModel");
const adminUser = require("../model/adminUserModel");

exports.register = async (req, res, next) => {
  const { email } = req.body;

  var user = await adminUser.findOne({ email });

  if (user) {
    return res.status(404).json({
      msg: "email already exists",
    });
    
  }

  try {
    if (req.body.password.length < 6) {
     return( res.status(404).json({
        msg: "password is too short",
      }));
    }

    if (req.body.password !== req.body.comparePassword) {
      return (res.status(404).json({
        msg: "Enter compare password same as password",
      }));
    }

    

    
    

    user = await adminUser.create(req.body);

    var createdTime = new Date()
    createdTime = createdTime.toDateString()

    user.createdTime = createdTime

    const token = user.getJWToken();
    

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      // httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({
        success: true,
        user,
        token,
        message: `${req.body.role} registered successfully!`,
      });
  } catch (e) {
    res.status(404).json({
      msg: "enter data carefully",
    });
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await adminUser.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      msg: "email not already",
    });
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = user.getJWToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message: "Login successfully!",
  });
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    // httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


exports.Add = async (req, res, next) => {
  const { email } = req.body;

  var user = await adminUser.findOne({ email });

  if (user) {
    return( res.status(404).json({
      msg: "email already exists",
    }));
  }

  if (req.user.role == "user" && req.body.role == "admin") {
    return res.status(404).json({
      msg: "User can add user only",
    });
  }

  try {
    if (req.body.password.length < 6) {
     return( res.status(404).json({
        msg: "password is too short",
      }));
    }

    if (req.body.password !== req.body.comparePassword) {
     return( res.status(404).json({
        msg: "Enter compare password same as password",
      }));
    }

    user = await adminUser.create(req.body);

    res.status(200).json({
      success: true,
      user,
      message: `${req.body.role} added successfully! `,
    });
  } catch (e) {
    res.status(404).json({
      msg: "enter data carefully",
    });
  }
};


exports.View = async (req, res, next) => {

    var user;
    
    user=await adminUser.find();
    if(req.user.role==="user"){
        user=await adminUser.find({role:'user'});
    }

    res.status(200).json({
        user,
        msg:'Data is here'
    })


}


exports.update= async(req,res,next)=>{

    var user = await findById(req.params.id)

    if(!user){

        return ( res.status(404).json({
            success:true,
            message:"not found",
            
          })
          )
    }

    
    
    user = await findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      var updatedTime = new Date();

    updatedTime= updatedTime.toDateString()

    user.updatedTime= updatedTime

    res.status(200).json({
        user,
        msg:'updated successfully'
    })


}