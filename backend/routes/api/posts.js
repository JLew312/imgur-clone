const express = require('express');
const { createPost,
        getPostById,
        editPostById,
        getAllPosts,
        deletePostById} = require('../../controllers/postsControllers');

const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/:id', getPostById);
router.put('/:id', protect, editPostById);
router.get('/', getAllPosts);
router.delete('/:id', protect, deletePostById);

module.exports = router;
