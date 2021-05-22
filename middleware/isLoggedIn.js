const Session = require("../models/Session.model");

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken || accessToken === "null") {
    // return an error. In the backend did res.redirect
    return res.status(401).json({ errorMessage: "Go Home. You're Drunk" });
  }
  Session.findById(accessToken)
    .populate("user")
    .then((theSession) => {
      if (!theSession) {
        return res.status(401).json({ errorMessage: "Go Home. You're Drunk" });
      }
      req.user = theSession.user;
      next();
    });
};
