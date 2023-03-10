const { register, login, setAvatar, getAllUsers, updateUser } = require("../controller/userController");

const router = require("express").Router();

router.post('/register',register);
router.post('/login',login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allusers/:id',getAllUsers);
router.post('/updateUser/:id',updateUser);

module.exports = router;