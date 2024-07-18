const User = require('../models/user.model')
const ForgotPassword = require('../models/forgot-password.model')

const generateHelper = require('../../../helpers/generate')
const sendMailHelper = require('../../../helpers/sendEmail')


const register = async (req , res) => {
    const existEmail = await User.findOne({
        email : req.body.email,
        deleted : false
    })
    if(existEmail){
        res.json({
            code : 400,
            message : "Email đã tồn tại!"
        })
    } else {
        const user = new User({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password,
            token : generateHelper.generateRandomString(20),
        })
        const data = await user.save();
        const token = data.token
        res.cookie("token" , token)

        res.json({
            code : 200,
            message : "Tạo tài khoản thành công!",
            token : token,
            data : data,
        })
    }
}
const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    console.log(user)
    if(!user) {
        res.json({
            code : 400,
            message : "Email không tồn tại!"
        })
        return;
    }
    if(user.password != password){
        res.json({
            code : 400,
            message : "Bạn đã nhập sai mật khẩu !"
        })
        return;
    }
    const token = user.token;
    res.cookie("token" , token);
    res.json({
        code : 200,
        message : "Đăng nhập thành công!",
        token : token,
    })

}

//!  Đăng nhập email và gửi mã OTP về email
const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        if(!user) {
            res.json({
                code : 400,
                message : "Email không tồn tại!"
            })
            return;
        }

        const OTP = generateHelper.generateOTP(5);
        const objectForgotPassword = {
            email : email,
            otp : OTP,
            timeExpire : Date.now() + 180000,
        }


        // Lưu vào database
        const forgotPassword = new Forgotpassword(objectForgotPassword)
        await forgotPassword.save()

        // Việc 2 : Gửi mã OTP qua email của user , vào trang để nhập mã otp
        const subject = "Xác Thực OTP"
        const html = `Xin chào ${user.fullname} <br> Mã xác thực OTP là:</br>  <b>${objectForgotPassword.otp} </b>`
        
        sendMailHelper.sendEmail(email,subject,html);

        res.json({
            code : 200,
            message : "Success!",
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}
//!  Xác thực OTP
const otpPassword = async (req, res) => {
    try {
        const email = req.body.email
        const otp = req.body.otp
    
        const result = await ForgotPassword.findOne({
            email: email,
            otp: otp
        })
        if(!result) {
            res.json({
                code : 400,
                message : "Mã OTP không hợp lệ!",
            })
            return;
        }
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        res.cookie("token" , user.token)


        res.json({
            code : 200,
            message : "Xác thực thành công!",
            token : user.token
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}
//!  Đổi mật khẩu
const resetPassword = async (req, res) => {
    try {
        const password = req.body.password
        const token = req.body.token // hoặc req.cookies.token nếu đã qua bước xác thực OTP
        
        const user = await User.findOne({
            token : token
        })
        if(user.password === password) {
            res.json({
                code : 400,
                message : "Mật khẩu giống mật khẩu cũ!",
            })
            return;
        }
    
        await User.updateOne({
            token : token
        }, {
            password : password,
        })



        res.json({
            code : 200,
            message : "Đổi mật khẩu thành công!",
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}
const detail = async (req, res) => {
    try {
        res.json({
            code : 200,
            message : "Success!",
            infor : req.user
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}
const listUser = async (req, res) => {
    try {
        const users = await User.find({
            deleted : false
        }).select("fullname email")


        res.json({
            code : 200,
            message : "Lấy ra danh sách người dùng thành công!",
            users : users
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}

module.exports = {
    register,
    login,
    forgotPassword,
    otpPassword,
    resetPassword,
    detail,
    listUser,
}