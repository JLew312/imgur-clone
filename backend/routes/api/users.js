const express = require('express');
const { registerUser,
        loginUser,
        getUser,
        getUserPosts,
        getUserComments } = require('../../controllers/usersControllers');

const { protect,
        belongsToUser } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.get('/:id/posts', getUserPosts);
router.get('/:id/comments', protect, getUserComments);
// router.put('/:id/favorites', protect, favoritePost);

module.exports = router;
