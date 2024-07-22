const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure the email is unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        // required: true,
    },
    mobileNo: {
        type: String,
        // required: true,
    },
    plant: {
        type: String,
    },
    // isAdmin: { type: Boolean, default: false }
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt timestamps
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
