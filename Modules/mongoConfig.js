const { MongoClient } = require('mongodb');
// const MongoClient =require('mongodb').MongoClient; // both are same
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'firstDB';

async function dbConnection() {
    // Use connect method to connect to the server
    const connection = await client.connect();
    const db = connection.db(dbName);
    return db.collection('practice');
}
module.exports = dbConnection;