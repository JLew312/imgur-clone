const express = require('express');
const { createComment, deleteComment } = require('../../controllers/commentsControllers');

const { protect } = require('../../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
