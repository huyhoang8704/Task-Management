const taskRoute = require("./task.route") // import

module.exports = (app) => {
    const PATHversion1 = "/api/v1"

    app.use(PATHversion1 + "/tasks",taskRoute);
}
