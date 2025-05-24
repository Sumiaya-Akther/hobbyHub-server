const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdnalzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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



    // API Route in server to return 6 ongoing featuredgroups

    app.get('/featured-groups', async (req, res) => {
      const groups = await groupsCollection.find({}).sort({ startDate: 1 }).limit(6).toArray();
      res.send(groups);
    });




    //all group api call

    app.get('/groups', async (req, res) => {
      //   const cursor = groupsCollection.find();
      //   const result = await cursor.toArray();
      const result = await groupsCollection.find().toArray();
      res.send(result);
    });


    //group details api call

    app.get('/group/:id', async (req, res) => {
      const id = req.params.id;
      const group = await groupsCollection.findOne({ _id: new ObjectId(id) });
      res.send(group);
    });



    app.post('/groups', async (req, res) => {

      const newGroup = req.body;
      console.log(newGroup);
      const result = await groupsCollection.insertOne(newGroup);
      res.send(result);

    });


    //-----------------


    app.get("/mygroups", async (req, res) => {
      try {
        const userEmail = req.query.email;
        if (!userEmail) {
          return res.status(400).json({ message: "Email is required" });
        }

        const userGroups = await groupsCollection.find({ userEmail }).toArray();
        res.status(200).json(userGroups);
      } catch (error) {
        console.error("Error fetching user groups:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });


    // DELETE group by ID

    app.delete("/deletegroups/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id);

        const result = await groupsCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "Group not found" });
        }
      } catch (error) {
        console.error("Error deleting group:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.put('/updategroup', async (req, res) => {
      try {
        const data = req.body;
        const filter = { _id: new ObjectId(data.groupId) };
        const replace = data

        console.log(replace, filter);
        const result = await groupsCollection.replaceOne(filter, replace);
        res.status(200).json(result);
      } catch (err) {
        console.error("Error updating group:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    //-----------

    //user related api


    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    });

    app.post('/users', async (req, res) => {
      const userProfile = req.body;
      console.log(userProfile);
      const result = await userCollection.insertOne(userProfile);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello hobby hub!')
});

app.listen(port, () => {
  console.log(`Hobby hub listening on port ${port}`)
});