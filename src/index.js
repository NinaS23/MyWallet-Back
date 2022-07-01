
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import usuarioAuth from "./Routes/usersRouter.js";
import registroRouter from "./Routes/registrosRoutes.js"



dotenv.config()

const app = express()
app.use(json())
app.use(cors())


app.use(usuarioAuth)
app.use(registroRouter)



const PORT = process.env.PORT || 5006

app.listen(PORT , () =>{
    console.log(`conectado na porta ${PORT}`)
})