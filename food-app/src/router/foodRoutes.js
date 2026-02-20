const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { createFoodController, getAllFoodsController,
  getFoodByResturantController, updateFoodController, deleteFoodController,
} = require("../controller/foodController");

const router = express.Router();

router.post("/create", authMiddleware, createFoodController);
router.get("/getAll", getAllFoodsController);
router.get("/getByResturant/:id", getFoodByResturantController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);
router.post(
  "/orderStatus/:id",
  authMiddleware
);

module.exports = router;