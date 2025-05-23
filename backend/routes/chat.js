const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Interests = require("../models/Interests");
const { body, validationResult } = require("express-validator");


router.post('/startchat/:id', 
fetchuser,
async(req, res) => {
    const newInterest = new Interests({
        Productid: req.params.id,
        offeredBy: req.user.id
    })

    newInterest.save((err, result) => {
        if(err)
        {
            return res.status(500).json({ error: "some error occoured" });
        }
        else
        {
            return res.json(result);
        }
    });
})


// ROUTE-2 :: get all interests for this product - GET
router.get("/getbuyers/:id", async (req, res) => {
    Interests.find({Productid : req.params.id}, async (err, result) => {
        if(err)
        {
            console.log(err);
            return res.status(500).send(err);
        }
        else
        {
            return res.json(result);
        }
    })
});



module.exports = router;   