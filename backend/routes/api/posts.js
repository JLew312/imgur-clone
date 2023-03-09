const express = require('express');
const { createPost,
        getPostById,
        editPostById,
        getAllPosts,
        favoritePost,
        deletePostById} = require('../../controllers/postsControllers');
const { upVotePost } = require('../../controllers/postVoteControllers');

const { protect,
        belongsToUser } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPost);
router.get('/:id', getPostById);
router.put('/:id', protect, belongsToUser, editPostById);
router.get('/', getAllPosts);
router.post('/:id/favorite', protect, favoritePost);
router.delete('/:id', protect, belongsToUser, deletePostById);
router.post('/:id/upvote', protect, upVotePost);

module.exports = router;
