const { MongoClient } = require("mongodb")
require("dotenv").config({ path: "./config.env" })

async function main(){
    const Db = process.env.ATLAS_URI
    const client = new MongoClient(Db)
    try{
        await client.connect();
        console.log("Connected!")
        const database = client.db("sample_mflix");
        const collections = await database.listCollections().toArray();
        collections.forEach(col => {console.log(col.name)})
    }
    catch(err){
        console.error(err)
    }
}
main()