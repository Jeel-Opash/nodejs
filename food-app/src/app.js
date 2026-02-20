const express = require("express")
const authRouter = require("./router/authRoutes")
const userRouter = require("./router/userRoutes")
const restaurantRoute = require("./router/restaurantRoutes")
const categoryRoutes = require("./router/categoryRoutes")
const foodRoutes = require("./router/foodRoutes")


const app = express()
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/resturant', restaurantRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/food', foodRoutes)



module.exports = app

