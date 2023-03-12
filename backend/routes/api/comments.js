const express = require('express');
const { createReply,
        deleteComment } = require('../../controllers/commentsControllers');

const { protect,
        belongsToUser } = require('../../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createReply);
router.post('/:commentId/comments', protect, createReply);
router.delete('/:commentId', protect, belongsToUser, deleteComment);

module.exports = router;
