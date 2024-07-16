const taskRoute = require("./task.route") // import
const userRoute = require("./user.route") // import

module.exports = (app) => {
    const PATHversion1 = "/api/v1"

    app.use(PATHversion1 + "/tasks",taskRoute);

    app.use(PATHversion1 + "/user",userRoute);
}
