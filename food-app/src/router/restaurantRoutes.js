const express = require("express");
const {getresturantByIdController,deleteresturantController, createresturantController,getAllresturantController, updateresturantController } = require("../controller/restaurantController");
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();
router.post('/create', authMiddleware, createresturantController)
router.get('/getAll', authMiddleware, getAllresturantController)
router.get('/get/:id', authMiddleware, getresturantByIdController)
router.delete('/delete/:id',authMiddleware,deleteresturantController)
router.put('/update/:id',authMiddleware,updateresturantController)

module.exports = router;
