import multer from "multer";
export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  console.log(res.locals);
  next();
};
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};
export const videoUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 30000000 },
});
export const avatarUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 100000000 },
});
