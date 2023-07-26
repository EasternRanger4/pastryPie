const express = require("express");
const fs = require('fs');
const { remove } = require("fs-extra");
const { request } = require("http");
const Datastore = require('nedb');
const router = express.Router();

const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const pageViews = new Datastore("data/history/pageViews.db");
pageViews.loadDatabase();

router.post('/addUser', async (request, response) => {
    const fname = request.body.fname; // First Name
    const mname = request.body.mname; // Middle Name
    const lname = request.body.lname; // Last Name
    const password = request.body.password; // Password
    const dob = request.body.dob; // Date of birth
    const clinetApri = "false";


    let username = `${lname.toLowerCase()}${dob.split("-")[0]}`; // lastName,yearborn
    // Check if username is already in use in data/userData.json
    const userData = JSON.parse(fs.readFileSync("data/userData.json", "utf8"));

    let isUsernameTaken = userData.some(user => user.username === username);
    let suffix = "a";
    while (isUsernameTaken) {
      username = `${lname.toLowerCase()}${dob.split("-")[0]}${suffix}`;
      isUsernameTaken = userData.some(user => user.username === username);
      suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
    }

    //User ID
    var maxUserId = "0";
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].userid > maxUserId) {
        maxUserId = userData[i].userid;
      }
    }
    var userid = String(Number(maxUserId) + 1);

    //User SSC 
    const userSSC = generateRandomCode(4);

    const newUser = {
      fname,
      mname,
      lname,
      password,
      dob,
      clinetApri,
      username,
      userid,
      userSSC
    };

    userData.push(newUser);
    fs.writeFileSync("data/userData.json", JSON.stringify(userData, null, 2));

    delete newUser.userSSC;
    delete newUser.password;
    return response.json({ message: true, content: newUser });
});

router.post('/seeUser', async (request, response) => {
    const userid = request.body.userID;
    const userSSC = request.body.userSSC;
    const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));
  
    const user = users.find(user => user.userid === userid && user.userSSC === userSSC);
  
    if (user) {
      if (user.clinetApri == "admin") {
        const filePath = 'data/userData.json';
        fs.readFile(filePath, 'utf8', (err, data) => {
            const jsonData = JSON.parse(data);
            for (i in jsonData) {
              delete jsonData[i].password;
              delete jsonData[i].userSSC;
            }
            response.json({ message: true, content: jsonData });
        });
      }
    } else {
      response.json({ message: false});
    }
});


router.post('/seeSpesUser', async (request, response) => {
  const userid = request.body.userID;
  const userSSC = request.body.userSSC;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.userid === userid && user.userSSC === userSSC);

  if (user) {
    if (user.clinetApri == "admin") {
      const filePath = 'data/userData.json';
      fs.readFile(filePath, 'utf8', (err, data) => {
          const jsonData = JSON.parse(data);
          for (i in jsonData) {
            delete jsonData[i].password;
            delete jsonData[i].userSSC;
          }
          for (i in jsonData) {
            if (jsonData[i].userid == request.body.userid) {
              response.json({ message: true, content: jsonData[i] });
            }
          }
      });
    }
  } else {
    response.json({ message: false});
  }
});

router.post('/delUser', async (request, response) => {
  // Path to the JSON file
  const filePath = 'data/userData.json';
  
  // Read the JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
      
    try {
      // Parse the JSON data into an array of objects
      const users = JSON.parse(data);
      
      // User ID to delete
      const userIdToDelete = request.body.userid;
      
      // Find the index of the user with the matching user ID
      const userIndex = users.findIndex(user => user.userid === userIdToDelete);
      
      if (userIndex !== -1) {
        // Remove the user object from the array
        users.splice(userIndex, 1);
      
        // Convert the updated array back into JSON
        const updatedJsonData = JSON.stringify(users, null, 2);
      
        // Write the updated JSON back to the file
        fs.writeFile(filePath, updatedJsonData, 'utf8', err => {
          if (err) {
            console.error('Error writing to the file:', err);
            response.json({ message: false });
            return;
          }
          response.json({ message: true });
        });
      } else {
        response.json({ message: false });
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      response.json({ message: false });
    }
  });
});

router.post('/editUser', async (request, response) => {
    fs.readFile('data/userData.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Find the user by userid
        const userid = request.body.userid;
        const user = jsonData.find((user) => user.userid === userid);
      
        if (user) {
          // Update user details
          user.fname = request.body.fname;
          user.mname = request.body.mname;
          user.lname = request.body.lname;
          user.dob = request.body.dob;
          user.clientApri = request.body.clientApri;
          user.username = request.body.username;
      
          // Save the updated JSON back to the file
          const updatedData = JSON.stringify(jsonData, null, 2);
          fs.writeFile('data/userData.json', updatedData, 'utf8', (err) => {
            if (err) {
              response.json({message: false})
              console.log(err)
              return;
            }
      
            response.json({message: true})
          });
        } else {
            response.json({message: false, content: "noUser found"})
        }
      });
});

router.post('/viewDatabases', (request, response) => {
  const userid = request.body.userID;
  const userSSC = request.body.userSSC;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.userid === userid && user.userSSC === userSSC);

  if (!user) {
    response.json({ message: false, content: "incorrect verification" });
    return;
  }

  if (user.clientApri === "false") {
    response.json({ message: false, content: "no permissions" });
    return;
  } else if (user.clientApri === "admin") {
    const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
    databaseLoginHistory.loadDatabase();

    const pageViews = new Datastore("data/history/pageViews.db");
    pageViews.loadDatabase();

    databaseLoginHistory.find({}, (err, loginData) => {
      if (err) {
        response.json({ message: false, content: "error locating loginHistory database" });
        return;
      }

      pageViews.find({}, (err, pageViewData) => {
        if (err) {
          response.json({ message: false, content: "error locating pageViews database" });
          return;
        }

        response.json({ message: true, content: loginData, contenttwo: pageViewData });
      });
    });
  }
});

function generateRandomCode(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}
  module.exports = router;