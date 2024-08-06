const User = require('../models/user.model')


module.exports.requireAuth = async (req,res,next) => {
    // FE gửi token qua headers
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)

        const user = await User.findOne({
            token : token
        }).select("-password")
        if(!user) {
            res.json({
                code : 400,
                message : "Token không hợp lệ"
            })
            return;
        }
        req.user = user;

        next();
    } else {
        res.json({
            code : 400,
            message : "Không có token !"
        })
    }
}