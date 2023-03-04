const isSeller = (req, res, next) => {
  if (!req.isSeller)
    return res.status(403).send("you are unauthorized to create this action");
  next();
};

module.exports = isSeller;
