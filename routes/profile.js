const router = require("express").Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.put("/update", isLoggedIn, (req, res) => {
  const { username, email } = req.body;
  // if (username.length < 8) {
  //   //DEAL WITH IT
  // }
  // if (email.length < 8) {
  //   //DEAL WITH IT
  // }
  User.find({ $or: [{ username }, { email }] })
    .then((allUsers) => {
      const allNotMe = allUsers.filter(
        (eachUser) => eachUser._id.toString() !== req.user._id.toString()
      );
      if (allNotMe.length) {
        // CANNOT UPDATE
        console.log("This name is taken");
      }
      User.findByIdAndUpdate(
        req.user._id,
        { email, username },
        { new: true }
      ).then((newUser) => {
        res.json({ user: newUser });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
