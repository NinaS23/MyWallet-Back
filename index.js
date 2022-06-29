
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";


dotenv.config()

const app = express()
app.use(json())
app.use(cors())

let db;
const mongoClient = new MongoClient(process.env.BANCO_URL);
const promise = mongoClient.connect();

promise.then(() => {
  db = mongoClient.db(process.env.BANCO_NAME);
  console.log(`conectou ao banco do  ${process.env.BANCO_NAME}` );
})
promise.catch(res => console.log(chalk.red("deu xabu"), res))


app.post("/login" , (req, res) =>{
    //req.body 
    const user = req.body   
   
    const userSchema = joi.object({
        email:joi.string().email().required() ,
        senha: joi.string().required()
    });
    const { error } = userSchema.validate(user)
    if(error){
        return res.status(400).send("email ou senha incorretos")
    }
     res.status(201).send("CREATED")
    //validar com joi se email é uma string vazia e senha string vazia
    //se n for , criptografar a senha e fazer um findeONe no email e ver se o user exist 
    //se n exite validar
    // se existe colocar no banco de dados com senha criptografada
})



const PORT = process.env.PORT || 5006

app.listen(PORT , () =>{
    console.log(`conectado na porta ${PORT}`)
})