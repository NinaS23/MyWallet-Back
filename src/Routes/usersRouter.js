import { logarUser  , cadastrarUser  } from "../controllers/usersAuthController.js"
import { Router } from "express"

const router = Router()

router.post("/" , logarUser)

router.post("/cadastrar" , cadastrarUser)

export default router;

