const router = require("express").Router();
const { login, getProfile, registerUser, updateProfile  } = require('../controllers/user');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login',login);
router.post('/register',registerUser);
router.get('/profile',verifyToken,getProfile);
router.put('/profile',verifyToken,updateProfile);


module.exports = router;