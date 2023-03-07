const express = require('express');
const { createPost,
        getPostById,
        getAllPosts } = require('../../controllers/postsControllers');

const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/:id', getPostById);
router.get('/', getAllPosts);

module.exports = router;
