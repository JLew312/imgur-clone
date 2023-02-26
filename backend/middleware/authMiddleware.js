const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async(req, res, next) => {
  let token;

  // if the authorization section of the headers section of the req object exists
  if (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header and assign it to "token" variable
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
})

module.exports = {
  protect,
}
