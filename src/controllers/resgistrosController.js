import { db  } from "../mongodb.js"




export async function enviarEntrada(req, res) {
 
  const valor = res.locals.valor
  const  desciption = res.locals.desciption 

try{
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let dataAtual = dia + '/' + mes;

    await db.collection("registros").insertOne({ valor, desciption, data: dataAtual , type:"entrada" })
    res.status(201).send("created")
}catch(e){
    console.log(e)
}


}


export async function enviarSaida(req, res) {
   
    
  const valor = res.locals.valor
  const  desciption = res.locals.desciption 

    try {

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
    const session = res.locals.session;
    
    const usuario = await db.collection("sessions").findOne({ 
        userId: session.userId 
       })
   
   if(usuario){
       const registros = await db.collection("registros").find().toArray()
       res.status(201).send(registros)
   }else{
       return res.status(401).send("não encontrei")
   }
 }