import {Router} from "express"
import UserController from "../Controller/UserController"
import Authentication from "../Middleware/Authentication";

const router = Router();
router.get("/",UserController.GetAllUsers)
router.post("/login",UserController.SignIn)
router.post("/signup",UserController.SignUp)

export default router;