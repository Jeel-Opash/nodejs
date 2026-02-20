const express = require("express");
const authMiddleware =require("../middleware/authMiddleware");
const { createCatController,getallCatController,updateCatController,deleteCatController} = require("../controller/categoryController");



const router=express.Router();


router.post('/create',authMiddleware,createCatController)
router.get('/getall',authMiddleware,getallCatController)
router.put('/update/:id',authMiddleware,updateCatController)
router.delete('/delete/:id',authMiddleware,deleteCatController)


module.exports = router;