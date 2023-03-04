const { User } = require("../models");
const { serializeUser } = require("../utility/serializeResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).send("user created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
    });
    if (!user) return res.status(404).send("User not found");
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) return res.status(401).send("password is incorrect");

    res
      .status(200)
      .cookie("accessToken", signAccessToken(user), {
        httpOnly: true,
        maxAge: +process.env.JWT_ACCESS_TOKEN_COOKIE_EXP,
      })
      .send(serializeUser(user._doc));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  return res
    .clearCookie("accessToken", {
      maxAge: -1,
    })
    .status(200)
    .send("user logged out successfully");
};

const signAccessToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      isSeller: user.isSeller,
    },
    process.env.JWT_ACCESS_TOKEN_KEY,
    {
      //TODO make cookies and jwt expire after 7 days
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXP,
    }
  );

module.exports = {
  register,
  login,
  logout,
};
