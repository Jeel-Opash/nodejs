const mongoose = require('mongoose')

const resturantSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Resturunt title is require"]
        },
        imageurl: {
            type: String,
        },
       
        time: {
            type: String,
        },
        pickup: {
            type: Boolean,
            default: true,
        },
        delivery: {
            type: Boolean,
            default: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        logourl: {
            type: String,
        },
        rating: {
            type: Number,
            default: 1,
            min: 1, max: 5
        },
        code: { type: String },
       
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resturant", resturantSchema);
