const express = require("express")
const app = express()
const port = 8080
const mongoose =  require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")


app.set("view engine" , "ejs")
app.set("views" ,path.join(__dirname , "views") )
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, '/public')))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}
main().then((data)=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err)
})

// Index Route
app.get("/listings" , async (req,res)=>{
   const allListing = await Listing.find({})
   res.render("listing/index.ejs", {allListing})
})

//New Route
app.get("/listings/new", (req,res)=>{
    res.render("listing/new.ejs")
})



//Show route
app.get("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listing/show.ejs", {listing})

})

//Create Route
app.post("/listings", async(req,res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save()
    res.redirect("/listings")
    
})

//Edit Route

app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    console.log(listing)
    res.render("listing/edit.ejs" , {listing})

})

//Update Route
app.put("/listings/:id" ,async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${id}`)
})


//Delete Route
app.delete("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id)
    console.log(deleted)
    res.redirect("/listings")
})


app.get("/", (req,res)=>{
    res.send("response send")
})
app.listen(port , (req,res)=>{
    console.log("server is running")
})