import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not authorized" });
    }


    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded_token.id;
    req.body.userId =decoded_token.id;

    console.log("Auth middleware - userId set:", req.userId);
    console.log("Auth middleware - req.body:", req.body);

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "You are not authorized USER." });
  }
};

export default authUser;
