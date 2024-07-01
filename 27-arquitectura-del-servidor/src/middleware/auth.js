export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
  res.status(401).send({ error: "Middleware: User not authenticated" });
};

export const isNotAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return next();
  } else {
    res.redirect("/profile");
  }
};
