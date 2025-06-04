const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;




app.use(express.json());

const FILE_NAME = "data.json";

// Function to read all items from the file
function getAllItems() {
  if (!fs.existsSync(FILE_NAME)) return [];
  const fileContent = fs.readFileSync(FILE_NAME, "utf8");
  return fileContent ? JSON.parse(fileContent) : [];
}

// Function to save all items to the file
function saveAllItems(items) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(items, null, 2));
}

// Create a new item
app.post("/", (req, res) => {
  const items = getAllItems();
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  saveAllItems(items);
  res.status(201).json(newItem);
});

// Get all items
app.get("/", (req, res) => {
  const items = getAllItems();
  res.json(items);
});

// Get one item by id
app.get("/:id", (req, res) => {
  const items = getAllItems();
  const foundItem = items.find(item => item.id == req.params.id);
  if (!foundItem) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(foundItem);
});

// Update an item by id
app.put("/:id", (req, res) => {
  const items = getAllItems();
  const itemIndex = items.findIndex(item => item.id == req.params.id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items[itemIndex] = { ...items[itemIndex], ...req.body };
  saveAllItems(items);
  res.json(items[itemIndex]);
});

// Delete an item by id
app.delete("/:id", (req, res) => {
  const items = getAllItems();
  const itemIndex = items.findIndex(item => item.id == req.params.id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  const deletedItem = items.splice(itemIndex, 1)[0];
  saveAllItems(items);
  res.json(deletedItem);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});