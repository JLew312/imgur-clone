const express = require('express');
const { createPost } = require('../../controllers/postsControllers');

const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);

module.exports = router;
