const express=require('express');
const router=express.Router();
const nodemailer = require('nodemailer');
const fetchuser = require('../middleware/fetchuser');


// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Outlook'
    auth: {
      user: 'your_email@example.com',
      pass: 'your_password',
    },
  });


  app.get('/send-email',fetchuser, async(req, res) => {
    

    const mailOptions = {
      from: 'your_email@example.com',
      to: 'recipient@example.com',
      subject: 'Customer for your product',
      text: `${req.user.name} is interested in your product and has texted you`,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  });


module.exports=router;