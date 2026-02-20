const categoryModel = require("../models/categoryModel")
const mongoose = require("mongoose");

const createCatController = async (req, res) => {
  try {
    const { title, imageurl } = req.body
    if (!title) {

      return res.status(404).send({
        success: false,
        message: "provide a category title & images "
      })

    }
    const newcategory = new categoryModel({ title, imageurl })
    await newcategory.save()
    res.status(201).send({
      success: true,
      message: 'category created',
      newcategory
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in category creation api",
      error: error.message
    })

  }
}



const getallCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (categories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All Category API",
      error,
    });
  }
};


const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Category ID",
      });
    }
    const { title, imageurl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageurl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Category ID",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category Found With this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted succssfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Delete Cat APi",
      error,
    });
  }
};
module.exports = {
  createCatController,
  updateCatController, getallCatController, deleteCatController
}