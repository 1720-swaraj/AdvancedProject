import jwt from "jsonwebtoken";

export const checkForAuthentication = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    req.usersData = null;
    return next();
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.usersData = decode;
  } catch (error) {
    req.usersData = null;
  }
  next();
};
