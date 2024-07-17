const User = require('../models/user.model')





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

module.exports = {
    register,
    login,
}