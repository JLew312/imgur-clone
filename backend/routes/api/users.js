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
router.get('/:id', getUserPosts);
router.get('/:id/comments', protect, getUserComments);

module.exports = router;
