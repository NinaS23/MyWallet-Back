
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import usuarioAuth from "./Routes/usersRouter.js";
import registroRouter from "./Routes/registrosRoutes.js"
import validarToken from "./midllewares/validarToken.js"



dotenv.config()

const app = express()
app.use(json())
app.use(cors())


app.use(usuarioAuth)
app.use(validarToken ,registroRouter)




app.listen(process.env.PORT , () =>{
    console.log(`conectado na porta ${process.env.PORT}`)
})