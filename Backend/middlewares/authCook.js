import jwt from "jsonwebtoken";

const authCook = async (req, res, next) => {
  try {
    const { ctoken } = req.headers;
    if (!ctoken) {
      return res.json({ success: false, message: "Not authorized" });
    }


    const decoded_token = jwt.verify(ctoken, process.env.JWT_SECRET);
    req.cookId = decoded_token.id;
    req.body.cookId =decoded_token.id;

    console.log("Auth middleware - cookId set:", req.cookId);
    console.log("Auth middleware - req.body:", req.body);

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "You are not authorized USER." });
  }
};

export default authCook;
