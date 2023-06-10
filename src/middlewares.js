import multer from "multer";
import multerS3 from "multer-s3";
import aws, { ProcessCredentials } from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
const multerUploader = multerS3({
  s3: s3,
  bucket: "wetube-nikejune",
  acl: "public-read",
});

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
  storage: multerUploader,
});
export const avatarUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 100000000 },
  storage: multerUploader,
});
