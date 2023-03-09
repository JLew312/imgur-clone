const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Post = require('../models/postModel');

const protect = asyncHandler(async (req, res, next) => {
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


const belongsToUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const post = await Post.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('Insufficient permissions.')
  }

  if ((post.user).valueOf() !== (user._id).valueOf()) {
    res.status(400);
    throw new Error('Insufficient permissions');
  } else {
    next();
  }
})


module.exports = {
  protect,
  belongsToUser
}
