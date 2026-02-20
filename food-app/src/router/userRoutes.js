const express = require("express");
const { getUserController, updateUserController,
    deleteUserController, updatePasswordController, resetPasswordController } = require("../controller/userController")
const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();



router.get('/getuser', authMiddleware, getUserController);
router.put('/updateuser', authMiddleware, updateUserController);
router.post('/updatepassword', authMiddleware, updatePasswordController);
router.post('/resetpassword', authMiddleware, resetPasswordController);
router.delete('/deleteuser/:id', authMiddleware, deleteUserController);
module.exports = router