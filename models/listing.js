const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const listingSchema = new  Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image:{
        type: String,
        set: (value) => value === "" ? "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : value,
        default: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

}, 
    price: Number,
    location: String,
    country: String
})

const Listing = mongoose.model("Listing", listingSchema)

module.exports =  Listing