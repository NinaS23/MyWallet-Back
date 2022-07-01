import { db  } from "../mongodb.js"
import joi from "joi";








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

    await db.collection("registros").insertOne({ valor, desciption, data: dataAtual , type:"entrada" })
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
        console.log("ntrei ")
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

        await db.collection("registros").insertOne({ valor, desciption, data: dataAtual , type:"saida"})
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

    const usuario = await db.collection("sessions").findOne({ 
        userId: sessao.userId 
       })
   
   if(usuario){
       const registros = await db.collection("registros").find().toArray()
       res.status(201).send(registros)
   }else{
       return res.status(401).send("não encontrei")
   }
 }