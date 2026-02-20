const restaurantModel = require("../models/restaurantModel");
const mongoose = require("mongoose");

const createresturantController = async (req, res) => {
    try {
        const { title, imageurl, time, pickup, delivery, isOpen, logourl, rating, code } = req.body;

        if (!title) {
            return res.status(400).send({
                success: false,
                message: "provide title"
            })
        }
        const newresturant = new restaurantModel({
            title, imageurl, time, pickup, delivery, isOpen, logourl, rating, code
        })
        await newresturant.save();
        res.status(201).send({
            success: true,
            message: "resturant create successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Restaurant Api not work",
            error: error.message
        })
    }
}


const getAllresturantController = async (req, res) => {
    try {
        const resturant = await restaurantModel.find({})
        if (resturant.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No resturant available'
            })
        }
        res.status(200).send({
            success: true,
            totalcount: resturant.length,
            resturant
        })

    } catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            message: 'all restaurant api in error',
            error: error.message,
        })

    }
}

const getresturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(resturantId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Restaurant ID"
            })
        }
        const resturant = await restaurantModel.findById(resturantId)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "no resturant found"
            })
        }
        res.status(200).send({
            success: true,
            resturant,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "get single resturant api not work",
            error: error.message
        })

    }
}


const deleteresturantController = async (req, res) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Found"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(resturantId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Restaurant ID"
            })
        }
        const resturant = await restaurantModel.findByIdAndDelete(resturantId);
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Resturant Account has been deleted successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "delete resturant api not work ",
            error: error.message
        })

    }
}


const updateresturantController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(resturantId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Restaurant ID"
            })
        }
        const { title, imageurl, time, pickup, delivery, isOpen, logourl, rating, code } = req.body;

        const updatedResturant = await restaurantModel.findByIdAndUpdate(
            resturantId,
            { title, imageurl, time, pickup, delivery, isOpen, logourl, rating, code },
            { new: true }
        );

        if (!updatedResturant) {
            return res.status(404).send({
                success: false,
                message: "No Restaurant Found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Restaurant Updated Successfully",
            updatedResturant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Update restaurant api not work",
            error: error.message
        });
    }
};


module.exports = {
    createresturantController, getAllresturantController,
    getresturantByIdController, deleteresturantController, updateresturantController
};
