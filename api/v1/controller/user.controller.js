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
            code : 404,
            message : "Email đã tồn tại!"
        })
    } else {
        const user = new User({
            fullname : req.body.fullname,
            email : req.body.email,
            password : req.body.password
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
            code : 404,
            message : "Email không tồn tại!"
        })
        return;
    }
    if(user.password != password){
        res.json({
            code : 404,
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
const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        if(!user) {
            res.json({
                code : 404,
                message : "Email không tồn tại!"
            })
            return;
        }

        const OTP = generateHelper.generateOTP(5);
        const objectForgotPassword = {
            email : email,
            otp : OTP,
            timeExpire : Date.now(),
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
            code : 200,
            message : "Error!",
            error : error
        })
    } 
}

module.exports = {
    register,
    login,
    forgotPassword,
}