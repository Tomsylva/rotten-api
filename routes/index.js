const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ user: "ola" });
});

const moviesRouter = require("./movies");
router.use("/movies", moviesRouter);

const authRouter = require("./auth");
router.use("/auth", authRouter);

const profileRouter = require("./profile");
router.use("/profile", profileRouter);

module.exports = router;
