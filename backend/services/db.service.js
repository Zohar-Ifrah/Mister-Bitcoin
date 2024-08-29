const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config(); // Load environment variables from .env

// Connection URL
const url = process.env.MONGO_URI;

// Database Name
const dbName = process.env.DB_NAME; // Use DB_NAME from .env

var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        console.log('DB connected!');
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err);
        throw err;
    }
}

async function getCollection(collectionName) {
    const db = await connect();
    return db.collection(collectionName);
}

function toObjectId(id) {
    try {
        return new ObjectId(id);
    } catch (err) {
        console.error('Invalid ObjectId format:', id, err);
        throw err;
    }
}


module.exports = {
    toObjectId,
    getCollection
};
