const foodModel = require("../models/foodModel");
const mongoose = require("mongoose");

const createFoodController = async (req, res) => {
  try {
    const { title, description, price, foodTags, category, isAvailable, restaurant, rating } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurant)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Restaurant ID",
      });
    }

    const newFood = new foodModel({
      title, description, price, foodTags, category, isAvailable, restaurant, rating
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};



const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (foods.length === 0) {
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
};






const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    // validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(resturantId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Restaurant ID",
      });
    }
    const food = await foodModel.find({ restaurant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};




const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    // validate food ID
    if (!mongoose.Types.ObjectId.isValid(foodID)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Food ID",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const { title, description, price, foodTags, category, isAvailable, restaurant, rating } = req.body;
    if (restaurant && !mongoose.Types.ObjectId.isValid(restaurant)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Restaurant ID",
      });
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      { title, description, price, foodTags, category, isAvailable, restaurant, rating },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Update Food API",
      error,
    });
  }
};




const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    // validate food ID
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Food ID",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror In Delete Food APi",
      error,
    });
  }
};

module.exports = {
  createFoodController, getAllFoodsController,
  getFoodByResturantController, updateFoodController, deleteFoodController,
};
