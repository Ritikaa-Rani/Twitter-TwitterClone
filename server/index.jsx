const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const uri =
  "mongodb+srv://ritikaranihbz:Ritika@twitterclone.cst6j.mongodb.net/?retryWrites=true&w=majority&appName=twitterClone";
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const postcollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");
    app.post("/register", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usercollection.insertOne(user);
      console.log("User inserted:", result);
      res.send(result);
    });

    //     const user = { email: "test@example.com", password: "password123" };
    //    const result = await usercollection.insertOne(user);
    //    console.log("User inserted:", result);

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postcollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      // console.log(profile)
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twitter clone is working...");
});

app.listen(port, () => {
  console.log(`Twitter clone is working on ${port}`);
});
