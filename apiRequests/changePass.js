const express = require("express");
const fs = require('fs');
const { remove } = require("fs-extra");
const { request } = require("http");
const Datastore = require('nedb');
const router = express.Router();
const crypto = require('crypto');

router.post('/editPassword', (request, response) => {
    const { userSSC, userID, oldPassword, newPassword } = request.body;

    // Read user data from 'userData.json'
    fs.readFile('data/userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.json({ content: false, message: 'Server error' });
            return;
        }

        try {
            const userData = JSON.parse(data);
            const user = userData.find((user) => user.userid === userID);

            if (!user) {
                response.json({ content: false, message: 'User not found' });
                return;
            }

            // Check if provided userSSC matches the stored userSSC
            if (user.userSSC !== userSSC) {
                response.json({ content: false, message: 'Internal server error code (938) please contact support via our contact page' });
                return;
            }

            // Hash the provided oldPassword and compare it with the stored hashed password
            const hashedOldPassword = hashPassword(oldPassword);
            if (user.password !== hashedOldPassword) {
                response.json({content: false, message: 'Invalid old password' });
                return;
            }

            // Hash the provided newPassword and update the user's password
            const hashedNewPassword = hashPassword(newPassword);
            user.password = hashedNewPassword;

            // Save the updated data back to 'userData.json'
            fs.writeFile('data/userData.json', JSON.stringify(userData, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    response.json({content: false, message: 'Server error' });
                    return;
                }

                response.json({ content: true, message: 'Password updated successfully' });
            });
        } catch (error) {
            console.error(error);
            response.json({ content: false, message: 'Server error' });
        }
    });
});


router.post('/editUserInfo', (request, response) => {
    const { userSSC, userID, firstName, middleName, lastName, dob } = request.body;

    // Read user data from 'userData.json'
    fs.readFile('data/userData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.json({content: false, message: 'Server error' });
            return;
        }

        try {
            const userData = JSON.parse(data);
            const userIndex = userData.findIndex((user) => user.userid === userID);

            if (userIndex === -1) {
                response.json({ content: false, message: 'User not found' });
                return;
            }

            const user = userData[userIndex];

            // Check if provided userSSC matches the stored userSSC
            if (user.userSSC !== userSSC) {
                response.json({ content: false, message: 'Internal server error code (938) please contact support via our contact page' });
                return;
            }

            // Update the user's information
            user.fname = firstName;
            user.mname = middleName;
            user.lname = lastName;
            user.dob = dob;

            // Save the updated data back to 'userData.json'
            fs.writeFile('data/userData.json', JSON.stringify(userData, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    response.json({content: false, message: 'Server error' });
                    return;
                }

                response.json({ content: true, message: 'User information updated successfully' });
            });
        } catch (error) {
            console.error(error);
            response.json({content: false, message: 'Server error' });
        }
    });
});

// Function to hash a password using SHA-256
function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

module.exports = router;