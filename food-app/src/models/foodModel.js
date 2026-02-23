const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Food title is required"],
        },
        description: {
            type: String,
            required: [true, 'food description is required']
},
        price: {
            type: Number,
            required: [true, 'food price is required']
        },
        foodTags: {
            type: String,
        },
        category: {
            type: String

        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: [true, "restaurant id is required"]
        },
        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
