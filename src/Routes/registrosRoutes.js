import { enviarEntrada , enviarSaida , pegarResgistros} from "../controllers/resgistrosController.js"
import { Router } from "express"
import joiValidar from "../midllewares/joiValidar.js"
const router = Router()


router.post("/entrada"  , joiValidar , enviarEntrada)

router.post("/saida" , joiValidar , enviarSaida)

router.get("/resgistro"  , pegarResgistros)

export default router