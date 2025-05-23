const express=require('express');
const router=express.Router();
const Products =require('../models/Products');
const Requests=require('../models/Requests');
var bodyParser = require('body-parser')
router.use(bodyParser.json());

//Route-1 for Products for sale
router.post('/sale',async(req,res)=>{
    // const input=JSON.parse(req.body.search);
    // req.body=input;
    Products.find({title:req.body.search,isRental:false},async(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }else{
            return res.json(data);
        }
    })
});
//Route-2 for Products for rent
router.post('/rent',async(req,res)=>{
    Products.find({title:req.body.search,isRental:true},async(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }else{
            return res.json(data);
        }
    })
})
//Route-3 for searching requests
router.post('/req',async(req,res)=>{
    Requests.find({title:req.body.search},async(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }else{
            return res.json(data);
        }
    })
})
//ROute-4  for category searching
router.post('/cat',async(req,res)=>{
    Products.find({category:req.body.category,isRental:false},async(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }else{
            return res.json(data);
        }
    })
})

module.exports=router;