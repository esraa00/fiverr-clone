const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log(accessToken);
  if (!accessToken) return res.status(401).send("you are not authenticated");

  jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY, (err, payload) => {
    if (err) return res.status(401).send("please login again");

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    console.log(payload);

    next();
  });
};

module.exports = isAuthenticated;
