import { Express, Request, Response , Router } from "express"
import User from "../models/user.model"
import { generateRandomString } from "../../../helpers/generate"

const register = async (req : Request, res : Response) => {
    try {
        const existEmail = await User.findOne({
            deleted : false,
            email : req.body.email
        })

        if(existEmail) {
            res.json({
                code : 400,
                message : "Email đã tồn tại"
            })
        } else {
            const user = new User({
                fullname : req.body.fullname,
                email : req.body.email,
                password : req.body.password,
                token : generateRandomString(30)
            })
            const data = await user.save()
            const token = data.token
            res.cookie("token" , token);
            res.json({
                code : 200,
                message : "Đăng ký thành công",
                token : token
            })
        }
    } catch (error) {
        res.json({
            code : 400,
            message : "Tạo tài khoản thất bại!",
            error : error
        })
    }
}
const login = async (req : Request, res : Response) => {
    try {
        const email : string = req.body.email
        const password : string = req.body.password
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
    } catch (error) {
        res.json({
            code : 400,
            message : "Đăng nhập thất bại!",
            error : error
        })
    }
}


export = {
    register,
    login,
}