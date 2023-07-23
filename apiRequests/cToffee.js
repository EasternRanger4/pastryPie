const express = require('express');
const fs = require('fs');
const router = express.Router();

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

// GET endpoint to retrieve the menu
router.get('/getMenu', (request, response) => {
  const menu = readDataFromFile('./data/client/coffee/menu.json');
  response.json(menu);
});

// POST endpoint to edit a specific item in the menu
router.post('/editMenu', (request, response) => {
  const { itemId, newName, newPrice } = request.body;

  let menu = readDataFromFile('./data/client/coffee/menu.json');

  const item = menu.find((item) => item.id === itemId);
  if (item) {
    item.name = newName;
    item.price = newPrice;
    writeDataToFile('./data/client/coffee/menu.json', menu);
    response.json({ success: true });
  } else {
    response.json({ success: false, message: 'Item not found' });
  }
});

// POST endpoint to edit an order's status
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
    response.json({ success: false, message: 'Order not found' });
  }
});

// POST endpoint to delete a menu item
router.post('/delMenu', (request, response) => {
  const { itemId } = request.body;

  let menu = readDataFromFile('./data/client/coffee/menu.json');

  const index = menu.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    menu.splice(index, 1);
    writeDataToFile('./data/client/coffee/menu.json', menu);
    response.json({ success: true });
  } else {
    response.json({ success: false, message: 'Item not found' });
  }
});

module.exports = router;
