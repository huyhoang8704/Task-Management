import { taskRoute } from "./task.route"
import { Express } from "express";
import { userRoute } from "./user.route";


const mainV1Routes = (app : Express) : void => {
    const PATHversion1 = "/api/v1"

    app.use(PATHversion1 + "/tasks",taskRoute);

    app.use(PATHversion1 + "/user",userRoute);

}

export default mainV1Routes