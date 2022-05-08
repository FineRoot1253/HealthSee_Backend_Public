const logoutUser = (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(204).end();
};

module.exports = logoutUser;
