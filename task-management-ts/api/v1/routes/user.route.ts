import { Express, Request, Response , Router } from "express"
import controller from "../controller/user.controller";
const router : Router = Router()



router.post('/register', controller.register)




export const userRoute = router;