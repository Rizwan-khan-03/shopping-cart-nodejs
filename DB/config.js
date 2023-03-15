const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('DBConnection Succesfull'))
.catch((err) => console.log("err", err));