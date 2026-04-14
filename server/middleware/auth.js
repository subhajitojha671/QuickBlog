import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;