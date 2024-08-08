import { taskRoute } from "./task.route"
import { Express } from "express";
import { userRoute } from "./user.route";
import * as authMiddleware from "../middlewares/auth.middleware"

const mainV1Routes = (app : Express) : void => {
    const PATHversion1 = "/api/v1"

    app.use(PATHversion1 + "/tasks",authMiddleware.requireAuth,taskRoute);

    app.use(PATHversion1 + "/user",userRoute);

}

export default mainV1Routes