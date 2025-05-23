const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Products = require("../models/Products");
const Users = require("../models/Users");
const Transactions = require("../models/Transactions");
const { body, validationResult, check } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const DatauriParser = require("datauri/parser");
const Validator = require("../middleware/Validator");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const parser = new DatauriParser();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});


router.post("/getListUser", async (req, res) => {
  Products.find({seller:req.body.userInfo._id}, async (err, listings) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      return res.json(listings);
    }
  });
});

// ROUTE-1 :: get all listings - Post - "/api/listing/getlistings" - DOES NOT REQUIRES LOGIN
router.get("/getlistings", async (req, res) => {
  Products.find({isRental:false}, async (err, listings) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      return res.json(listings);
    }
  });
});

// ROUTE-Rent :: get all rents- Post - "/api/listing/getrent" - DOES NOT REQUIRES LOGIN
router.get("/getrent", async (req, res) => {
  Products.find({isRental:true}, async (err, listings) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } else {
      return res.json(listings);
    }
  });
});

// ROUTE-2 :: add a listing - Post - "/api/listing/addlisting" - REQUIRES LOGIN
router.post(
  "/addlisting",
  fetchuser, // middlware
  // [
    
    
  //   body("title", "enter a valid title").not().isEmpty(),
  //   body("description", "description must be atleast 4 characters").isLength({
  //     min: 4,
  //   }),
  //   body("price", "offering Amount must be greater than zero").isFloat({
  //     min: 0,
  //   }),
  //   body(
  //     "isRental",
  //     "make rental true or false depending on your listing"
  //   ).isBoolean(),
  // ],
  multer({ storage }).single("image"),
  Validator
  ,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      console.log(req.body);
        // const data=JSON.parse(req.body.json);
      const filetype = req.file.mimetype.split("/")[1];
      // const newfilename = req.file.filename + "." + filetype;
      const f = parser.format(filetype.toString(), req.file.buffer).content;
      const photoUrl = await cloudinary.uploader.upload(f);

      console.log("photo uploaded");
      const otherDetails=[req.body.Option1,req.body.Option2,req.body.Option3];
     const bool=req.body.isRental[0]==='R' ?true : false; 

      const newProduct = new Products({
        title: req.body.inputTitle,
        description: req.body.description,
        price: req.body.inputPrice,
        availability: true,
        seller: req.user.id,
        category: req.body.category,
        isRental: bool,
        imageURL: photoUrl.url,
        condition: req.body.condition,
        location: req.body.location,
        otherDetails: otherDetails
      });

      newProduct.save((err, product) => {
        if (err) {
          return res.status(500).json({ error: "some error occoured" });
        } else {
          return res.json(product);
        }
      });
    }
  }
);

// Route-3 :: mark product as sold  - PUT - "/api/listing/addlisting" - REQUIRES LOGIN
router.put("/marklisting/:id", fetchuser, async (req, res) => {
  try {
    // find the request
    let product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Not Found");
    } else {
      // Allow change only if user owns this request
      if (product.seller.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      } else if (product.seller.toString() === req.user.id) {
        product = await Products.findByIdAndUpdate(req.params.id, {
          availability: false,
        });

        res.json({ Success: "Product has been sold or rented successfully" });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
