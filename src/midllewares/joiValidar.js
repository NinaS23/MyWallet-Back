import joi from "joi"



export default async function joiValidar(req , res , next){
   const { valor, desciption } = req.body

    const entradaSaidaSchema = joi.object({
        valor: joi.number().min(1).required(),
        desciption: joi.string().min(1).required()
    })

    const { error } = entradaSaidaSchema.validate({ valor, desciption })
    if (error) {
      
        return res.status(401).send("preencha os dados corretamente")
    }

    res.locals.valor = valor;
    res.locals.desciption = desciption

    next()
}