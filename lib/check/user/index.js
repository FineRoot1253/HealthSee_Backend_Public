const checkUser = (req, res) => {
  const { user } = req.body;

  res.json(user);
};

const checkLogin = (req, res, next) => {
  if (!req.body.user) {
    res.status(401).end();
    return;
  }
  next();
};

module.exports = {
  checkUser,
  checkLogin,
};
