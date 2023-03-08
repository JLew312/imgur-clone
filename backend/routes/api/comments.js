const express = require('express');
const { createComment } = require('../../controllers/commentsControllers');

const { protect } = require('../../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/', protect, createComment);

module.exports = router;
