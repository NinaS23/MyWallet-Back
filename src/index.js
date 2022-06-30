
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import { logarUser  , cadastrarUser  } from "./controllers/usersAuthController.js"
import { enviarEntrada } from "./controllers/resgistrosController.js"

dotenv.config()

const app = express()
app.use(json())
app.use(cors())


app.post("/" , logarUser )

app.post("/cadastrar" , cadastrarUser )

app.post("/entrada" , enviarEntrada)

const PORT = process.env.PORT || 5006

app.listen(PORT , () =>{
    console.log(`conectado na porta ${PORT}`)
})