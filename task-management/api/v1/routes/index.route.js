const taskRoute = require("./task.route") // import
const userRoute = require("./user.route") // import

const authMiddleware = require("../middlewares/auth.middleware")

module.exports = (app) => {
    const PATHversion1 = "/api/v1"

    app.use(PATHversion1 + "/tasks",authMiddleware.requireAuth,taskRoute);

    app.use(PATHversion1 + "/user",userRoute);
}
