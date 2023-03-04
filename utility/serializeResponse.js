const serializeUser = (user) => {
  const { password, ...userInfo } = user;
  return userInfo;
};

module.exports = { serializeUser };
