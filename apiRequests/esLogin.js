const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const saltRounds = 10; // The number of salt rounds determines the computational cost (higher value means more secure but slower)
const filePath = path.join('./data/admin/adminTemp.json');

// Helper function to read users from the file
function readUsers() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Helper function to write users to the file
function writeUsers(users) {
  try {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (error) {
    throw new Error('Error writing to file.');
  }
}

// Your existing route handlers
router.post('/addUser', async (request, response) => {
  try {
    const password = request.body.password;
    const username = request.body.username;

    // Read existing users from the file
    const users = readUsers();

    // Check if the username already exists
    if (users.hasOwnProperty(username)) {
      return response.status(409).send('Username already exists.');
    }

    // Hash the password before saving to the file
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the 'username' and 'hashedPassword' to the users object
    users[username] = hashedPassword;

    // Write the updated users object back to the file
    writeUsers(users);

    response.json({message: true, content: 'User added successfully'});
  } catch (error) {
    response.json({message: false})
  }
});

router.post('/checkPassword', async (request, response) => {
  try {
    const password = request.body.password;
    const username = request.body.username;

    // Read existing users from the file
    const users = readUsers();

    // Check if the username exists in the users object
    if (!users.hasOwnProperty(username)) {
      return response.status(404).send('User not found.');
    }

    // Fetch the hashed password from the users object based on the 'username'
    const hashedPassword = users[username];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
        response.json({message: true, content: 'Password Correct'});
    } else {
        response.json({message: false})
    }
  } catch (error) {
    response.status(500).send('Error checking password.');
  }
});

router.post('/changePassword', async (request, response) => {
  try {
    const password = request.body.password;
    const username = request.body.username;

    // Read existing users from the file
    const users = readUsers();

    // Check if the username exists in the users object
    if (!users.hasOwnProperty(username)) {
      return response.status(404).send('User not found.');
    }

    // Hash the new password before updating in the users object
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's hashed password in the users object based on the 'username'
    users[username] = hashedPassword;

    // Write the updated users object back to the file
    writeUsers(users);

    response.send('Password changed successfully.');
  } catch (error) {
    response.status(500).send('Error changing password.');
  }
});


module.exports = router;
