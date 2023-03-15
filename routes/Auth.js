const router = require('express').Router();
const User = require('../model/User');
const CryptoJS = require("crypto-js");
const jwtToken = require("jsonwebtoken");

// register 
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password:req.body.password,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).send({ payload: savedUser, message: "SignUp Success" })
    } catch (error) {
        res.status(400).send({ payload: {}, message: "token not exist", err: error })
    }

}); 
// login
router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).send({ payload: {}, message: "Wrong Cendential" });

        const hashedPssword = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
        const originalPassword = hashedPssword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(400).send({ payload: {}, message: "Wrong Cendential" });
        const { password, ...others } = user._doc;

        const accesToken = jwtToken.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SEC,
             { expiresIn: "24h" }, (err, token) => {
                if (err) {
                    res.status(400).send({ payload: {}, message: "token not exist", err: err })
                } else {
                    res.status(200).send({ payload: { ...others, accesToken }, message: "Login Success", token: token })
                }
            })

        // const accesToken = jwtToken.sign(
        // {
        //     id: user._id,
        //     isAdmin: user.isAdmin
        // },
        //     process.env.JWT_SEC,    
        //     {expiresIn:'1d'}
        // )
        
        // res.status(200).send({ payload: { ...others, accesToken }, message: "Login Success" })
    } catch (error) {
        res.status(400).send({ payload: {}, message: "Wrong Cendential", err: error })
    }

});
module.exports = router;