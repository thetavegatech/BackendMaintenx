const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        username:String,
        email:{type:String },
        password:String,
        mobileNo:Number,
        userRoll:String,
    }
    // {
    //     collection:"UserInfo",
    // }
);

mongoose.model("UserInfo",UserDetailsSchema);