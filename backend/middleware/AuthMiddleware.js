import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid Token" });
    req.user = user;
    next();
  });
};

export default AuthMiddleware;
