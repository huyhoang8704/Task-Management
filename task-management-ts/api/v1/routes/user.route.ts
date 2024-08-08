import { Express, Request, Response , Router } from "express"
import controller from "../controller/user.controller";
const router : Router = Router()

import * as authMiddleware from "../middlewares/auth.middleware"

router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/detail',authMiddleware.requireAuth ,controller.detail)





export const userRoute = router;