import { enviarEntrada , enviarSaida , pegarResgistros} from "../controllers/resgistrosController.js"
import { Router } from "express"

const router = Router()


router.post("/entrada"  , enviarEntrada)

router.post("/saida" , enviarSaida)

router.get("/resgistro"  , pegarResgistros)

export default router