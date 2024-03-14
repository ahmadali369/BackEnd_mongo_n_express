import config from "config";
import { MongoClient } from "mongodb";
const uri = config.get('dbURI');
const client = new MongoClient(uri)
let conn;
try {
    conn = await client.connect();
    console.log("Connected to DB"); 
} catch (e) {
    console.error(e);
}
let db = conn.db("StudentsDB");


export default db;