
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import router from "./Routes/usersRouter.js";
import { enviarEntrada , enviarSaida , pegarResgistros} from "./controllers/resgistrosController.js"


dotenv.config()

const app = express()
app.use(json())
app.use(cors())


app.use(router)

app.post("/entrada" , enviarEntrada)

app.post("/saida" , enviarSaida)

app.get("/resgistro" , pegarResgistros)

const PORT = process.env.PORT || 5006

app.listen(PORT , () =>{
    console.log(`conectado na porta ${PORT}`)
})