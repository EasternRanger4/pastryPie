const express = require('express');
const fs = require('fs');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
router.use(express.json());

// Helper function to read data from a JSON file
function readDataFromFile(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

// Helper function to write data to a JSON file
function writeDataToFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET endpoint to retrieve all orders
router.get('/getOrders', (request, response) => {
  const orders = readDataFromFile('./data/client/coffee/orders.json');
  response.json(orders);
});

router.post('/editOrder', (request, response) => {
  const { orderId, newStatus } = request.body;

  let orders = readDataFromFile('./data/client/coffee/orders.json');

  const order = orders.find((order) => order.id === orderId);
  if (order) {
    order.status = newStatus;
    writeDataToFile('./data/client/coffee/orders.json', orders);
    response.json({ success: true });
  } else {
    response.json({ success: false, message: 'Order not found' });
  }
});

// POST endpoint to delete an order
router.post('/delOrder', (request, response) => {
  const { orderId } = request.body;

  let orders = readDataFromFile('./data/client/coffee/orders.json');

  const index = orders.findIndex((order) => order.id === orderId);
  if (index !== -1) {
    orders.splice(index, 1);
    writeDataToFile('./data/client/coffee/orders.json', orders);
    response.json({ success: true });
  } else {
    response.json({ message: false, content: 'Order not found' });
  }
});

// POST endpoint to create a new order
router.post('/newOrder', async (request, response) => {
  const newOrder = request.body;
  let orders = readDataFromFile('./data/client/coffee/orders.json');

  newOrder.id = generateUniqueId();
  newOrder.status = "Received";

  orders.push(newOrder);

  try {
    // Send email to customer
    const to = request.body.email;
    const sub = `Order Number: ${request.body.id}`
    const txt = `Thank you for ordering a coffee! 
    Name: ${request.body.name}
    Email: ${request.body.email}
    Milk: ${request.body.milk}
    Sugar: ${request.body.sugar}
    Notes: ${request.body.orderNotes}`
    await sendEmail(to, sub, txt);

    // Send email to admin
    const jsonData = await fs.promises.readFile('data/pinCodes.json', 'utf8');
    const to2 = JSON.parse(jsonData)[5].pin;
    const sub2 = `New Coffee Order`
    const txt2 = `
    Order Number: ${newOrder.id}
    Name: ${request.body.name}
    Email: ${request.body.email}
    Milk: ${request.body.milk}
    Sugar: ${request.body.sugar}
    Notes: ${request.body.orderNotes}`
    await sendEmail(to2, sub2, txt2);

    // Write data to file
    await fs.promises.writeFile('./data/client/coffee/orders.json', JSON.stringify(orders, null, 2));

    response.json({ message: true, content: newOrder.id });
  } catch (error) {
    // Handle any errors that occur during the process
    response.status(500).json({ message: false, error: error.message });
  }
});

router.post("/orderUpdate", (request, response) => {
  let orders = readDataFromFile('./data/client/coffee/orders.json');

  for (i in orders) {
    if (orders[i].id == request.body.orderId) {
      const timestamp = Date.now();
      response.json({message: true, content: orders[i].status, timestamp: timestamp})
    }
  }
});

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function sendEmail(to, sub, txt) {
  return new Promise((resolve, reject) => {
    const password = process.env.GMAIL;
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'kamran_tailor@hotmail.com',
        pass: password
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'kamran_tailor@hotmail.com',
      to: to,
      subject: sub,
      text: txt
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}


module.exports = router;
