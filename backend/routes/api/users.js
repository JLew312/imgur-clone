const express = require('express');
const { registerUser,
        loginUser,
        getUser } = require('../../controllers/usersControllers');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser)

module.exports = router;
