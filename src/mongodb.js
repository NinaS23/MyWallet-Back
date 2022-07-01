import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"


dotenv.config()

let db;
const mongoClient = new MongoClient(process.env.BANCO_URL);
const promise = mongoClient.connect();

promise.then(() => {
    db = mongoClient.db(process.env.BANCO_NAME);
    console.log(`conectou ao banco do  ${process.env.BANCO_NAME}`);
})
promise.catch(res => console.log(chalk.red("deu xabu"), res))

export {
    db ,
    ObjectId
}