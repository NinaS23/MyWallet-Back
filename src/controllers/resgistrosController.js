import dotenv from "dotenv"
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import bcypt from "bcrypt"
import { v4 as uuid } from "uuid"


dotenv.config()


let db;
const mongoClient = new MongoClient(process.env.BANCO_URL);
const promise = mongoClient.connect();

promise.then(() => {
    db = mongoClient.db(process.env.BANCO_NAME);
    console.log(`conectou ao banco do  ${process.env.BANCO_NAME}`);
})
promise.catch(res => console.log(chalk.red("deu xabu"), res))


export async function enviarEntrada(req, res) {
    const { valor, desciption } = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const entradaSchema = joi.object({
        valor: joi.number().min(1).required(),
        desciption: joi.string().min(1).required()
    })

    const { error } = entradaSchema.validate({ valor, desciption })
    if (error) {
        return res.status(401).send("preencha os dados corretamente")
    }


    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
        return res.sendStatus(401);
    }

    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let dataAtual = dia + '/' + mes;

    await db.collection("entrada").insertOne({ valor, desciption, data: dataAtual })
    res.status(201).send("created")

}


export async function enviarSaida(req, res) {
    const { valor, desciption } = req.body
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const saidaSchema = joi.object({
        valor: joi.number().min(1).required(),
        desciption: joi.string().min(1).required()
    })

    const { error } = saidaSchema.validate({ valor, desciption })
    if (error) {
        return res.status(401).send("preencha os dados corretamente")
    }

    try {
        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let dataAtual = dia + '/' + mes;

        await db.collection("saida").insertOne({ valor, desciption, data: dataAtual })
        res.status(201).send("created")
    } catch (e) {
        console.log(e)
    }


}

 export async function pegarResgistros(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token){
        return res.status(401).send("não autorizado")
    }
   const sessao =  await db.collection("sessions").findOne({token})

   if(!sessao){
       return res.status(401).send("não autorizado")
   }

    const usuario = await db.collections("sessions").findOne({ 
        userId: session.userId 
       })
   
   if(usuario){

       res.status(201).send("uhull")
   }else{
       return res.status(401).send("não encontrei")
   }
 }