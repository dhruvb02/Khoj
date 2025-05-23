const express=require('express');
const router=express.Router();
const interest=require('../models/Interests');
const fetchuser = require('../middleware/fetchuser');

router.post('/addinterest',fetchuser,async(req,res)=>{
    const newinterest=new interest({
        Productid:req.body.Productid,
        offeredBy:req.user.id
    })
    try{
        const savedinterest=await newinterest.save();
        res.json(savedinterest);
    }catch(err){
        res.json({message:err});
    }

})



router.get('/getinterest',async(req,res)=>{
  
       interest.find({},  async(err, listings) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            } else {
              return res.json(listings);
            }
        })
     
   
})
module.exports=router;