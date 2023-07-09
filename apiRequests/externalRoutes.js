const express = require("express");
const fs = require('fs');
const Datastore = require('nedb');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

router.post('/notifyAdmin', async (request, response) => {
    const password = process.env.GMAIL;
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
        user: 'kamran_tailor@hotmail.com',
        pass: password
        }
    });
    
    const sub = `Contact - ${request.body.subject}`
    const txt = `You have a new message from the contact page on your website 
    Email: ${request.body.email} 
    Subject: ${request.body.txt}`
    // Define the email options
    const mailOptions = {
        from: 'kamran_tailor@hotmail.com',
        to: 'kamrantailor@gmail.com',
        subject: sub,
        text: txt
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.json({message: false})
        } else {
            response.json({message: true})
        }
    });
});

module.exports = router;
