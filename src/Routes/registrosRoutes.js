import { enviarEntrada , enviarSaida , pegarResgistros} from "../controllers/resgistrosController.js"
import { Router } from "express"
import validarToken from "../midllewares/validarToken.js"
const router = Router()


router.post("/entrada" , validarToken , enviarEntrada)

router.post("/saida" ,validarToken , enviarSaida)

router.get("/resgistro" ,validarToken , pegarResgistros)

export default router