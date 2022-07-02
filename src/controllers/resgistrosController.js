import { db , ObjectId } from "../mongodb.js"




export async function enviarEntrada(req, res) {
  
    const session = res.locals.session;
  const valor = res.locals.valor
  const  desciption = res.locals.desciption 

try{
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let dataAtual = dia + '/' + mes;


    const usuario = await db.collection("login").findOne({ 
        email: session.email 
       })
       console.log(usuario)

    await db.collection("registros").insertOne({ valor, desciption, data: dataAtual , type:"entrada" , email:usuario.email})
    res.status(201).send("created")
}catch(e){
    console.log(e)
}


}


export async function enviarSaida(req, res) {
   
    const session = res.locals.session;
  const valor = res.locals.valor
  const  desciption = res.locals.desciption 

    try {

        let data = new Date();
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let dataAtual = dia + '/' + mes;

    const usuario = await db.collection("login").findOne({ 
        email: session.email 
       })
       console.log(usuario)

        await db.collection("registros").insertOne({ valor, desciption, data: dataAtual , type:"saida" , email:usuario.email })
        res.status(201).send("created")
    } catch (e) {
        console.log(e)
    }


}

 export async function pegarResgistros(req, res){
    const session = res.locals.session;
    
    const usuario = await db.collection("login").findOne({ 
        userId: session.userId 
       })
      const email =  await db.collection("registros").findOne({
         email:usuario.email
      })
      const user = await db.collection("login").findOne({
          email:session.email
      })
   console.log(email.email , user.email)
   if(usuario){
       const registros = await db.collection("registros").find({email:email.email}).toArray()
       res.status(201).send(registros)
   }else{
       return res.status(401).send("não encontrei")
   }
 }