const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../utiles/generateToken")




// Auth user/set Token 
// route Post /api/users/auth
// @access public 
const authUser = asyncHandler(async (req, res) => {  
    // res.status(200).json({ message : "Auth User" })

    const {email , password} = req.body;

    const user = await User.findOne({email});


    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            mobileNO: user.mobileNO,
            plant: user.plant
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password")
    }

});

// registerUser new user 
// route Post /api/users/auth
// @access public 
const registerUser = asyncHandler(async (req, res) => {   
    const { name, email, password, role, mobileNO, plant } = req.body;   
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400)
        throw new Error("User Already exists")
    }

    const user = await User.create({
        name, 
        email,
         password, 
         role,
          mobileNO,
          plant
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            mobileNO: user.mobileNO,
            plant: user.plant
        })
    } else {
        res.status(400);
        throw new Error("Invalid user Data")
    }
});



// logoutUser
// route Post /api/users/auth
// @access public 
const logoutUser = asyncHandler(async (req, res) => {  

    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({ message : "User logged out" })
});

// getUser profile
// route get  /api/users/prifile
// @access private 
const getUserProfile = asyncHandler(async (req, res) => {  
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        mobileNO: req.user.mobileNO,
        plant: req.user.plant
    }

    res.status(200).json(user)
});


// Update user profile
// route get  /api/users/prifile
// @access private 
const updateUserProfile = asyncHandler(async (req, res) => { 
    
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            mobileNO: updatedUser.mobileNO,
            plant: updatedUser.plant
        })

    } else {
        res.status(404);
        throw new Error("User not found")
    }  
});

// const getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.find({});
//     res.json(users);
//   });

  const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  });


module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers
};