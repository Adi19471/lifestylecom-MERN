const mongoose = require("mongoose")

const ProductCollection = new mongoose.Schema({

    name:String,
    price:String,
    categery :String,
    userID:String,
    company:String,
    description:String
})

module.exports = mongoose.model("Product", ProductCollection)