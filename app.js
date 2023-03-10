
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = 6000;
app.use(express.json())


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DBConnection Succesfull'))
    .catch((err) => console.log("err", err));

    app.get('/api/test',()=>{
        console.log(`test is succes`);
    })

// router 
const userRouter = require('./routes/users')
app.use('/api/user',userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});