/* 
  File Name: ComplexApp.js
  Description: This code simulates a complex application that manages orders and inventory.
*/

// Define a class for managing orders
class Order {
  constructor(orderId, customerId, items) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.items = items;
  }

  getTotal() {
    let total = 0;
    for (let item of this.items) {
      total += item.price * item.quantity;
    }
    return total;
  }

  getDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000); // Add 4 days for delivery
    return deliveryDate;
  }
}

// Define a class for managing inventory
class Inventory {
  constructor() {
    this.items = [];
  }

  addItem(name, price, quantity) {
    this.items.push({
      name: name,
      price: price,
      quantity: quantity,
    });
  }

  removeItem(name) {
    const index = this.items.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  updateQuantity(name, quantity) {
    const item = this.items.find((item) => item.name === name);
    if (item) {
      item.quantity += quantity;
    }
  }

  getItemQuantity(name) {
    const item = this.items.find((item) => item.name === name);
    return item ? item.quantity : 0;
  }
}

// Create an instance of the Inventory class
const inventory = new Inventory();

// Add some items to the inventory
inventory.addItem("Laptop", 1000, 5);
inventory.addItem("Smartphone", 800, 10);
inventory.addItem("Tablet", 500, 7);

// Create an order
const order = new Order(1, 123, [
  { name: "Laptop", price: 1000, quantity: 2 },
  { name: "Smartphone", price: 800, quantity: 1 },
]);

// Display order details
console.log(`Order ID: ${order.orderId}`);
console.log(`Customer ID: ${order.customerId}`);
console.log("Items:");
for (let item of order.items) {
  console.log(`${item.name} - $${item.price} - ${item.quantity} pcs`);
}
console.log(`Total: $${order.getTotal()}`);
console.log(`Estimated Delivery Date: ${order.getDeliveryDate()}`);

// Simulate inventory updates
inventory.updateQuantity("Laptop", -1);
inventory.updateQuantity("Smartphone", -1);
inventory.updateQuantity("Tablet", -2);

// Display updated inventory
console.log("Inventory:");
for (let item of inventory.items) {
  console.log(`${item.name} - $${item.price} - ${item.quantity} pcs`);
}