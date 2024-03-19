// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";
const db = await connectToDatabase();
const collection = db.collection("users");
const existingEmail = await collection.findOne({ email: req.body.email });
const newUser = await collection.insertOne({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hash,
    createdAt: new Date(),
});
const payload = {
    user: {
        id: newUser.insertedId,
    },
};

const authtoken = jwt.sign(payload, JWT_SECRET);
async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);

    await client.connect();
    dbInstance = client.db(dbName);
    return dbInstance;
}

module.exports = connectToDatabase;