const express = require("express");
const fs = require('fs');
const Datastore = require('nedb');
const router = express.Router();
const crypto = require('crypto');

const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();

// Function to hash the password using SHA-256
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

//Login
router.post('/login', (request, response) => {
  const { username, password } = request.body;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.username === username && user.password === hashPassword(password));

  if (user) {
    // Since the password is hashed in the database, we don't need to delete it from the user object
    delete user.lname;
    delete user.mname;
    delete user.dob;
    delete user.dob;
    delete user.password;
    response.json({ message: true, user });
    databaseLoginHistory.insert({ message: true, username: username });
  } else {
    response.json({ message: false });
    databaseLoginHistory.insert({ message: false, username: username });
  }
});

router.post('/resetUserPassword', (request, response) => {
  const { userId } = request.body;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  // Find the user with the specified user ID
  const user = users.find(user => user.userid === userId);

  if (user) {
    // Reset the user's password to "password123" (or any other default password you prefer)
    const newPassword = "password123";
    user.password = hashPassword(newPassword);

    // Save the updated user data back to the file
    fs.writeFileSync('data/userData.json', JSON.stringify(users, null, 2));

    response.json({ message: true, content: 'Password reset successfully.' });
  } else {
    response.json({ message: false, content: 'User not found.' });
  }
});

//Internal data check
router.post('/intDataCheck', (request, response) => {
    const userid = request.body.userID;
    const userSSC = request.body.userSSC;
    const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));
  
    const user = users.find(user => user.userid === userid && user.userSSC === userSSC);

    delete user.password;
    if (user) {
      response.json({ message: true , content: user});
    } else {
      response.json({ message: false});
    }
});

module.exports = router;
