import { Express, Request, Response , Router } from "express"
import controller from "../controller/user.controller";
const router : Router = Router()



router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/detail/:id', controller.detail)





export const userRoute = router;