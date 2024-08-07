import { taskRoute } from "./task.route"
import { Express } from "express";


const mainV1Routes = (app : Express) : void => {
    const PATHversion1 = "/api/v1"

    app.use(PATHversion1 + "/tasks",taskRoute);

}

export default mainV1Routes