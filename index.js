require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const MongoClient = require("mongodb").MongoClient;

// database connection dgfsf
connection();

app.use(express.json())
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

const MONGO_URL = process.env.DB;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected 😊");
    return client;
  }
   const client = createConnection();

app.get("/fruits", async function(request,response){
    console.log("fruits running Started");
    const result = await  new MongoClient(MONGO_URL).connect() 
      .db("b30wd")
      .collection("fruits")
      .find({})
      .toArray();
      console.log("fruits running successfully");
    response.send(result);
  });

  const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log(`Server started in port ${port}`));