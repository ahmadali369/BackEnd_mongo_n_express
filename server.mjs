import config from "config";
import express from "express";
import cors from "cors";
import db from "./db/db.mjs";
import { ObjectId } from "mongodb";


const app = express();
const port = config.get('port');

app.use(express.json()); 
app.use(cors());
app.get("/students", async (req, res) => {
    let collection = db.collection('StudentTbl');
    let results = await collection
        .find({})
        .limit(10)
        .toArray();
    console.log(results);
    res.send(results).status(200);
})

app.get("/students/:id", async (req, res) => {
    let collection = db.collection('StudentTbl');
    let results = await collection
        .findOne({

            _id: new ObjectId(req.params.id)

        });
    console.log(results);
    res.send(results).status(200);
})



app.post("/students", async (req, res)=>{
    let collection = db.collection('StudentTbl');
    let results = await collection
        .insertOne(req.body);
    console.log(results);
    res.send(results).status(200);

})


app.put("/students/:id/:marks", async (req, res) => {
    let collection = db.collection('StudentTbl');
    let results = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { "$set": { marks: req.params.marks } }
    );
    console.log(results);
    res.status(200).send(results);
});



app.delete("/students/:id", async (req, res) => {
    let collection = db.collection('StudentTbl');
    let results = await collection
        .deleteOne({

            _id: new ObjectId(req.params.id)

        }, 
        
        );
    console.log(results);
    res.send(results).status(200);
})







app.listen(port, () => {
    console.log("Server started on port " + port)
})