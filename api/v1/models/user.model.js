const mongoose = require("mongoose");
const generate = require("../../../helpers/generate")

const UserSchema = new mongoose.Schema(
    {
        fullname: String,
        email : String,
        password : String,
        token : String, 
        deleted: {
            type : Boolean,
            default: false,
        },
        deletedAt: Date,

    },
    {
        timestamps : true
    }
);


const User = mongoose.model("User",UserSchema,"users") // argu3 là tên connection trong db


module.exports = User;
