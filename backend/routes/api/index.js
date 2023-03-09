const router = require('express').Router();
const usersRouter = require('./users');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

router.use('/users', usersRouter);
router.use('/gallery', postsRouter);
router.use('/posts/:postId/comments', commentsRouter);

module.exports = router;
