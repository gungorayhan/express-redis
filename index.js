const express = require("express")
const redis = require("redis")
const util = require("util")

const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

//client.set = util.promisify(client.set); //async/await kullanımı için ayarlamaları yapıyoruz. promise tabanlı işleve döndürüyoruz

const app= express();
app.use(express.json());

app.post("/:key", async(req,res)=>{
    const {key}=req.params
    const response = await client.get(key);
    res.json(response);
})
app.post("/", async(req,res)=>{
    const {key,value} = req.body;
    const response = await client.set(key,value);
   res.json(response);
})


app.listen(6060,()=>{
    console.log("Listening")
})