const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Email already exists, please Login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    user.password = undefined;
    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Provide email & Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials (email not found)",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials (password incorrect)",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    })
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,

    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login Api",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };
