const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdnalzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.mdnalzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();


    const groupsCollection = client.db('groupDB').collection('groups');
    const userCollection = client.db('groupDB').collection('users');



    // app.get('/new-groups', async (req, res) => {
    //         const today = new Date();
    //         const result = await groupCollection.find({startDate: { $gte: today.toISOString()}})
    //         .limit(6)
    //         .toArray();
    //         res.send(result);
    //     })

    app.get('/groups', async(req, res)=>{
        //   const cursor = groupsCollection.find();
        //   const result = await cursor.toArray();
        const result = await groupsCollection.find().toArray();
        res.send(result);
    })
    
    app.post('/groups', async(req, res) => {
         
        const newGroup = req.body;
        console.log(newGroup);
        const result = await groupsCollection.insertOne(newGroup);
        res.send(result);

    })

    //user related api
    
    app.post('/users', async(req, res) => {
        const userProfile = req.body;
        console.log(userProfile);
        const result = await userCollection.insertOne(userProfile);
        res.send(result);
    })






    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello hobby hub!')
})

app.listen(port, () => {
  console.log(`Hobby hub listening on port ${port}`)
})