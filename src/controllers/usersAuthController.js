
import joi from "joi";
import bcypt from "bcrypt"
import { v4 as uuid } from "uuid" 
import { db  } from "../mongodb.js"



export async function logarUser(req, res) {
  
    const user = req.body   

    const userSchema = joi.object({
        email:joi.string().email().required() ,
        senha: joi.string().min(4).required()
    });
console.log(user.senha)
    const { error } = userSchema.validate(user)
    if (error) {
        return res.status(400).send("email ou senha incorretos")
    }
    try{

        const acharUser = await db.collection("users").findOne({ email: user.email })
        console.log(acharUser.nome)
        
        
        let compararSenhas =  bcypt.compareSync(user.senha, acharUser.senha)
        console.log(acharUser.email)
        if (!acharUser || !compararSenhas) {
         
            return res.status(401).send("email ou senha incorretos")
        }else{
           const token = uuid();
           await db.collection("login").insertOne({
               userId: acharUser._id,
               email:acharUser.email,
               token,

               
           })
           const nome = acharUser.nome
           return res.send({ token , nome})
        }
    }catch(e){
        console.log(e)
    }
}


 export async function cadastrarUser(req , res) {

    const { nome , email , senha , senha2} = req.body

    const cadastroSchema = joi.object({
        nome:joi.string().required(),
        email:joi.string().email().required() ,
        senha: joi.string().min(4).required(),
        senha2:joi.string().required()
    });
    const { error } = cadastroSchema.validate({nome , email , senha , senha2})
    if(error){
        return res.status(400).send("reveja os campos preenchidos")
    }
    try{
        const verificaEmail = await db.collection("users").findOne({email})
        if(verificaEmail){
            return res.status(400).send("email existente")
        }
        if(senha !== senha2){
            return res.status(400).send("reveja a senha pfv")
        }
        const criptografarSenha = bcypt.hashSync(senha , 10)
        await db.collection('users').insertOne({ nome , email , senha: criptografarSenha , senha2: criptografarSenha }) 
        res.status(201).send("CREATED")
    }catch(e){
        console.log(e)
    }

}