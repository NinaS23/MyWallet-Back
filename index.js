
import express, { json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import bcypt from "bcrypt"
import { v4 as uuid } from "uuid" 


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


app.post("/" , async (req, res) =>{
  
    const user = req.body   

    const userSchema = joi.object({
        email:joi.string().email().required() ,
        senha: joi.string().min(4).required()
    });

    const { error } = userSchema.validate(user)
    if (error) {
        return res.status(400).send("email ou senha incorretos")
    }
    try{

        const acharUser = await db.collection("users").findOne({ email: user.email })
        const compararSenhas = bcypt.compareSync(user.senha, acharUser.senha)
        if (!acharUser || !compararSenhas) {
            console.log(acharUser.senha)
            return res.status(401).send("email ou senha incorretos")
        }else{
           const token = uuid();
           await db.collection("sessions").insertOne({
               userId: acharUser._id,
               token
           })
           return res.send(token)
        }
    }catch(e){
        console.log(e)
    }
})

app.post("/cadastrar" , async (req , res)=>{

    const { nome , email , senha , url} = req.body

    const cadastroSchema = joi.object({
        nome:joi.string().required(),
        email:joi.string().email().required() ,
        senha: joi.string().min(4).required(),
        url:joi.string().required()//usar regex pra validar a url
    });
    const { error } = cadastroSchema.validate({nome , email , senha , url})
    if(error){
        return res.status(400).send("reveja os campos preenchidos")
    }
    try{
        const verificaEmail = await db.collection("users").findOne({email})
        if(verificaEmail){
            return res.status(400).send("email ou senha incorretos")
        }
        const criptografarSenha = bcypt.hashSync(senha , 10)
        await db.collection('users').insertOne({ nome , email , senha: criptografarSenha , url }) 
        res.status(201).send("CREATED")
    }catch(e){
        console.log(e)
    }

})

const PORT = process.env.PORT || 5006

app.listen(PORT , () =>{
    console.log(`conectado na porta ${PORT}`)
})