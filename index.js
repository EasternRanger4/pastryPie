const express = require("express");
const Datastore = require('nedb');
const app = express();
var fs = require('fs');
const { request } = require("http");
app.use(express.json());
require('dotenv').config()

//Requer api files 
//const cocktailRoutes = require('./apiRequests/cocktailRoutes');

//Load Databases
const databaseLoginHistory = new Datastore("data/history/loginHistory.db");
databaseLoginHistory.loadDatabase();
const cocktailMenu = new Datastore("data/client/cocktails/cocktails.db");
cocktailMenu.loadDatabase();
const cocktailOrders = new Datastore("data/client/cocktails/cocktailOrders.db");
cocktailOrders.loadDatabase();

//APP.USE
//app.use('/cocktails', cocktailRoutes);

app.post("/cocktails", async (request, response) => {
  if (request.body.type == "seeOrders") {
    cocktailOrders.find({}, (err, documents) => {
      if (err) { response.json({ message: false, type: "error locating dataBase"});;} 
      else { response.json({ message: true, content: documents}) ;}
    });
  } else if (request.body.type == "addMenu") {
    const name = request.body.name;
    const info = request.body.info;
    const url = request.body.url;
    const cat = request.body.cat;
    const insertedEntry = { name, info, url, cat }; // Use insertedEntry instead of newEntry
    cocktailMenu.insert(insertedEntry, (err, insertedEntry) => { // Use insertedEntry instead of newEntry
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else {
        response.json({ message: true });
      }
    });
  } else if (request.body.type == "seeMenu") {
    cocktailMenu.find({}, (err, documents) => {
      if (err) { response.json({ message: false, type: "error locating dataBase"});;} 
      else { response.json({ message: true, content: documents, type: request.body.type}) ;}
    });
  } else if (request.body.type == "delMenuItem") {
    const itemId = request.body._id;
    cocktailMenu.remove({ _id: itemId }, {}, (err, numRemoved) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else if (numRemoved === 0) {
        response.json({ message: false, type: "item not found" });
      } else {
        response.json({ message: true });
      }
    });
  } else if (request.body.type == "getEnt") {
    const entryId = request.body._id
    cocktailMenu.findOne({ _id: entryId }, (err, entry) => {
      if (err) {
        response.json({ message: false, type: "error locating entey" });
      } 
      if (entry) {
        response.json({ message: true, content: entry}); 
      } else {
        response.json({ message: false, type: "error locating entey" });
      }
    });
  } else if (request.body.type == "updateEnt") {
    const updatedValues = {
      name: request.body.name,
      info: request.body.info,
      url: request.body.url,
      cat: request.body.cat
    };
    const entryId = request.body._id;
    cocktailMenu.update({ _id: entryId }, { $set: updatedValues }, {}, (err, numAffected) => {
      if (err) {
        response.json({ message: false, type: "error locating entey" });
        return;
      }
    
      if (numAffected > 0) {
        response.json({ message: true}); 
      } else {
        response.json({ message: false, type: "error locating entey" });
      }
    });
  } else if (request.body.type == "delOrder") {
    const itemId = request.body._id;
    cocktailOrders.remove({ _id: itemId }, {}, (err, numRemoved) => {
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else if (numRemoved === 0) {
        response.json({ message: false, type: "item not found" });
      } else {
        response.json({ message: true });
      }
    });
  } else if (request.body.type == "addOrder") {
    const name = request.body.name;
    const cocktail = request.body.cocktail;
    const notes = request.body.notes;
    const contact = request.body.contact;
    const insertedEntry = { name, cocktail, notes, contact}; // Use insertedEntry instead of newEntry
    cocktailOrders.insert(insertedEntry, (err, insertedEntry) => { // Use insertedEntry instead of newEntry
      if (err) {
        response.json({ message: false, type: "error locating database" });
      } else {
        response.json({ message: true });
      }
    });
  }
});
//Test Command
app.post('/test', (request, response) => {
  console.log("");
  response.json({ message: true});
  console.log("****TEST**** ")
  console.log(request.body)
});
//Login
app.post('/login', (request, response) => {
  const { username, password } = request.body;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    response.json({ message: true, user });
    databaseLoginHistory.insert({message: true, username: username});
  } else {
    response.json({ message: false});
    databaseLoginHistory.insert({message: false, username: username});
  }
});
//Internal data check
app.post('/intDataCheck', (request, response) => {
  const userid = request.body.userID;
  const userSSC = request.body.userSSC;
  const users = JSON.parse(fs.readFileSync('data/userData.json', 'utf-8'));

  const user = users.find(user => user.userid === userid && user.userSSC === userSSC);

  if (user) {
    response.json({ message: true , content: user});
  } else {
    response.json({ message: false});
  }
});
//TFL Bike Points
app.get("/tflBikePoints", async (request, response) => {
  const tflKey = process.env.KEY
  const url = `https://api.tfl.gov.uk/BikePoint?app_id=${tflKey}`;
  const tflresponce = await fetch (url);
  const tflBikePoint = await tflresponce.json();
  response.json({ message: true, tflBikePoint });
});
//TFL Road Distruptions
app.get("/tflRoadDis", async (request, response) => {
  const tflKey = process.env.KEY
  const url = `https://api.tfl.gov.uk/Road/All/Disruption?stripContent=false&app_id=${tflKey}`;
  const tflresponce = await fetch (url);
  const tflRoadDis = await tflresponce.json();
  response.json({ message: true, tflRoadDis });
});
//TFL Train status
app.get("/tflTrainStatus", async (request, response) => {
  const tflKey = process.env.KEY
  const tubeURL = `https://api.tfl.gov.uk/line/mode/tube/status?app_id=${tflKey}`;
  const tubeRes = await fetch(tubeURL);
  const tubeDta = await tubeRes.json();
  const elizabethURL = `https://api.tfl.gov.uk/line/mode/elizabeth-line/status?app_id=${tflKey}`;
  const elizabethRES = await fetch(elizabethURL);
  const elizabethDta = await elizabethRES.json();
  const dlrURL = `https://api.tfl.gov.uk/line/mode/dlr/status?app_id=${tflKey}`;
  const dlrRES = await fetch(dlrURL);
  const dlrDta = await dlrRES.json();
  const overgroundURL = `https://api.tfl.gov.uk/line/mode/overground/status?app_id=${tflKey}`;
  const overgroundRES = await fetch(overgroundURL);
  const overgroundDta = await overgroundRES.json();
  const tramURL = `https://api.tfl.gov.uk/line/mode/tram/status?app_id=${tflKey}`;
  const tramRES = await fetch(tramURL);
  const tramDta = await tramRES.json();

  response.json({ message: true, tubeDta, elizabethDta, dlrDta, overgroundDta, tramDta });
});
//TFL Stop Points 
app.post("/tflStopPoints", async (request, responce) => {
  const tflKey = process.env.KEY
  const url = `https://api.tfl.gov.uk/line/${request.body.line}/stoppoints?app_id=${tflKey}`
  const aresponce = await fetch(url);
  const data = await aresponce.json();
  var line = "";
  if (request.body.line === "bakerloo") {
    line = "Bakerloo";
  } else if (request.body.line === "central") {
    line = "Central";
  } else if (request.body.line === "circle") {
    line = "Circle";
  } else if (request.body.line === "district") {
    line = "District";
  } else if (request.body.line === "hammersmith-city") {
    line = "Hammersmith & City";
  } else if (request.body.line === "jubilee") {
    line = "Jubilee";
  } else if (request.body.line === "metropolitan") {
    line = "Metropolitan";
  } else if (request.body.line === "northern") {
    line = "Northern";
  } else if (request.body.line === "piccadilly") {
    line = "Piccadilly";
  } else if (request.body.line === "victoria") {
    line = "Victoria";
  } else if (request.body.line === "waterloo-city") {
    line = "Waterloo & City";
  } else {
    line = request.body.line
  }
  responce.json({data, line});

});
//TFL Bus Times {RADIUS} 
app.post("/tflBusPoints", async (request, responce) => {
  const tflKey = process.env.KEY
  const lat = request.body.lat;
  const lon = request.body.lon;
  const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=700&app_id=${tflKey}`;
  const apiResponce = await fetch(url);
  const resData = await apiResponce.json();
  responce.json({ message: true, resData});
});
//TFL Bus Times
app.post("/tflBusTimes", async (request, responce) => {
  const tflKey = process.env.KEY
  const id = request.body.id;
  const url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals?app_id=${tflKey}`;
  const apiResponce = await fetch(url);
  const resData = await apiResponce.json();
  responce.json({ message: true, resData});
});

app.post("/updateUser", async (request, response) => {
  try {
    // Read the userdata.json file
    const data = fs.readFileSync('data/userdata.json', 'utf8');
    const userData = JSON.parse(data);

    // Find the user based on the provided userid
    const userIdToUpdate = request.body.userid;
    const userToUpdate = userData.find(user => user.userid === userIdToUpdate);

    if (request.body.admin == undefined) {
      if (userToUpdate) {
        // Update the user data with the provided values
        userToUpdate.fname = request.body.fname;
        userToUpdate.mname = request.body.mname;
        userToUpdate.lname = request.body.lname;
        userToUpdate.password = request.body.password;
        userToUpdate.dob = request.body.dob;

        // Save the updated data back to the file
        fs.writeFileSync('data/userdata.json', JSON.stringify(userData, null, 2), 'utf8');

        // Send a response indicating success
        response.json({ message: true });
      } else {
        response.json({ message: false, error: 'User not found with the provided userid.' });
      }
    } else if (request.body.admin == true) {
      if (userToUpdate) {
        // Update the user data with the provided values
        userToUpdate.fname = request.body.fname;
        userToUpdate.mname = request.body.mname;
        userToUpdate.lname = request.body.lname;
        userToUpdate.password = request.body.password;
        userToUpdate.username = request.body.username;
        userToUpdate.dob = request.body.dob;
        userToUpdate.userid = request.body.userid;
        userToUpdate.clinetApri = request.body.clinetApri;

        // Save the updated data back to the file
        fs.writeFileSync('data/userdata.json', JSON.stringify(userData, null, 2), 'utf8');

        // Send a response indicating success
        response.json({ message: true });
      } else {
        response.json({ message: false, error: 'User not found with the provided userid.' });
      }
    }
  } catch (error) {
    console.error(error);
    response.json({ message: false, error: 'An error occurred while updating the user data.' });
  }
});


app.post("/admin", (request, response) => {
  if (request.body.type == "addUser") { 
    const fname = request.body.fname; // First Name
    const mname = request.body.mname; // Middle Name
    const lname = request.body.lname; // Last Name
    const password = request.body.password; // Password
    const dob = request.body.dob; // Date of birth
    const clientApri = "false";

    let username = `${lname.toLowerCase()},${dob.split("-")[0]}`; // lastName,yearborn

    // Check if username is already in use in data/userData.json
    const userData = JSON.parse(fs.readFileSync("data/userData.json", "utf8"));

    let isUsernameTaken = userData.some(user => user.username === username);
    let suffix = "a";
    while (isUsernameTaken) {
      username = `${lname.toLowerCase()}${dob.split("-")[0]}${suffix}`;
      isUsernameTaken = userData.some(user => user.username === username);
      suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
    }

    var maxUserId = "0";

    for (var i = 0; i < userData.length; i++) {
      if (userData[i].userid > maxUserId) {
        maxUserId = userData[i].userid;
      }
    }

    var userid = String(Number(maxUserId) + 1);
    const userSSC = generateRandomCode(4);

    const newUser = {
      fname,
      mname,
      lname,
      password,
      dob,
      clientApri,
      username,
      userid,
      userSSC
    };

    userData.push(newUser);
    fs.writeFileSync("data/userData.json", JSON.stringify(userData, null, 2));

    return response.json({ message: true, content: newUser });
  } else if (request.body.type == "viewUser") {
    const filePath = 'data/userData.json';
      fs.readFile(filePath, 'utf8', (err, data) => {
          const jsonData = JSON.parse(data);
          response.json({ message: true, content: jsonData });
      });
  } else if (request.body.type == "delUser") {
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

  }
});

//Pins 
app.post("/clinetPinCodes", async (request, responce) => {
  if (request.body.type = "NT") {
    const toSend = process.env.FCADMINPIN
    responce.json({ message: true, toSend});
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

let port = 3000;
app.use(express.static("public"));
app.listen(port, () => console.log(`Listening at port ${port}`));