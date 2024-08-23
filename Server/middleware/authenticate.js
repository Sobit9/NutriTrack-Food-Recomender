import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
  
    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '');
    // console.log('Received token:', token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded token:', decoded);
      const user = await User.findById(req.user.userId);
      console.log('User found:', user);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      req.user.role = user.role;
      console.log('User role:', req.user.role);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

  export default authenticate
  
export const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };