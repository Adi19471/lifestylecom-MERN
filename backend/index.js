require("./db/config");
// server.js
const express = require("express");
const mongoose = require("mongoose");

const User = require("./db/Users");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    let users = new User(req.body);
    let results = await users.save();
    res.send(results);
  } catch (error) {
    res.status(500).json({ error: "Server Error Posting" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((email, password)) {
      let result = await User.findOne({ email, password });
      if (result) {
        res.send(result);
      } else {
        res.send({ resultinfo: "No data found in User" });
      }
    } else {
      res.status(404).send({ info: "data not avalibe  backend" });
    }
  } catch (error) {
    res.status(501).send({ error: "Internal Server Error" });
  }
});

const Product = require("./db/Product");

app.post("/add-product", async (req, res) => {
  try {
    let results = new Product(req.body);

    let result = await results.save();

    res.send(result);
  } catch (error) {
    res.json(501).send({ error: "Internal Server Error product" });
  }
});

app.get("/products", async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length > 0) {
      res.status(200).send(products);
    } else {
      res.send({ resuls: "No Products Inforamtion...." });
    }
  } catch (error) {
    res.status(501).send({ error: "Interal Eroro at product list" });
  }
});




// TODO Singile time 

app.delete("/prodct/:id", async(req, res) => {
  try {
    let product = await Product.deleteOne({ _id: req.params.id });
    if (product.length>0) {
      res.send(product);
    } else {
      res.json({ message : "Already  Deleeted ...." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Product Delete" });
  }
});




// TODO   all deleteted at a time


app.delete("/prodctdelete/", async(req, res) => {
  try {
    let product = await Product.deleteMany();
    if (product.length>0) {
      res.send(product);
    } else {
      res.json({ message : "Already  Deleeted ...." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Product Delete" });
  }
});





app.get("/product/:id",async(req,res) =>{

  try {

    let result = await Product.findOne({_id:req.params.id})

    if(result){
      res.send(result)
    }
    else{
      res.json({message:"No Record Data founds"})
    }
    
  } catch (error) {
    res.json(500).json({error:"Internal Server Product Update id"})
  }
})






// app.delete("/product/:id", async (req, res) => {
//   try {
//     let product = await Product.deleteOne({ _id: req.params.id });
//     if (product.deletedCount > 0) {
//       res.send(product);
//     } else {
//       res.json({ message: "Product already deleted." });
//     }
//   } catch (error) {
//     res.status(500).send({ error: "Internal Server Error: Product Delete" });
//   }
// });







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
