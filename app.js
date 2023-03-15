
const express = require('express');
require('./DB/config')
const app = express();
app.use(express.json())
const PORT = 6000;




// router 
const userRouter = require('./routes/users');
const authRouter =require('./routes/Auth')

// api

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});