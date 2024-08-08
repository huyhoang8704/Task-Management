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
        })
    }
}


export = {
    register,
}