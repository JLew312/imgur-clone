const express = require('express');
const { registerUser,
        loginUser,
        getUser,
        getUserPosts,
        getUserComments,
        getUserFavorites } = require('../../controllers/usersControllers');

const { protect,
        belongsToUser } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.get('/:id/posts', getUserPosts);
router.get('/:id/comments', protect, getUserComments);
router.get('/:id/favorites', protect, getUserFavorites);

module.exports = router;
