const { verifyTokenAndAuthorization } = require('./VeriFyToken');

const router = require('express').Router();
const User = require('../model/User');

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_KEY
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  });
module.exports = router;