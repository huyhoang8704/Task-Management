import { Express, Request, Response , Router } from "express"
import controller from "../controller/task.controller"
const router : Router = Router()



router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.patch('/change-status/:id', controller.changeStatus)

router.post('/create', controller.create)

router.patch('/edit/:id', controller.edit)



export const taskRoute = router;