const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");


const getUserController = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid User ID",
      });
    }
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'user not found'
      })
    }
    user.password = undefined
    res.status(200).send({
      success: true,
      message: 'user get successfully',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Get user api",
      error: error.message
    })
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid User ID",
      });
    }
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(404).send({
        success: false, message: 'user not found'
      })
    }
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save()
    res.status(200).send({
      success: true,
      message: "user updated successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in update user api '
    })
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid User ID",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedpassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};






const resetPasswordController = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body
    if (!email || !newpassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields"
      })
    }

    const user = await userModel.findOne({ email, answer })
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found"
      })
    }
    let salt = bcrypt.genSaltSync(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedpassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error in reset password api',
      error: error.message,
    })
  }
}


const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid User ID",
      });
    }
    await userModel.findByIdAndDelete(id)
    return res.status(200).send({
      success: true,
      message: "Account has been deleted"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in delete Api",
      error: error.message
    })

  }
}


module.exports = {
  getUserController, deleteUserController,
  updateUserController, resetPasswordController,
  updatePasswordController
};