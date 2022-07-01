import { db } from "../mongodb.js"


async function validarToken(req,res,next){
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');

    if(!token){
        return res.status(401).send("não autorizado")
    }

    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
        return res.sendStatus(401);
    }
     res.locals.session = session;

     next()
    
}
export default validarToken;