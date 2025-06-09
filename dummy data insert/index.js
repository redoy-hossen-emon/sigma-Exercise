
const express = require("express")();
const mongoose = require("mongoose")
const data = require("./dummy data.js");


mongoose.connect("mongodb://localhost:27017/company");

function pick(key) {

  let randomnum = Math.floor(Math.random() * 20);

  if (key == "status") {
    let status = randomnum > 10 ? true : false;
    return status;
  }
  return data[randomnum][key];

}

const userSchema = new mongoose.Schema({
  name: String,
  sellary: Number,
  city: String,
  ismanager: Boolean,
});

const users = Array.from({ length: 10 }, () => ({
  name: pick('name'), sellary: pick('sellary'), city: pick('city'), language: pick('language'), ismanager: pick('status')
}));


User = mongoose.model("employees", userSchema);

// Insert dummy data into the collection----------
async function seeduser() {
  await User.deleteMany({})

 await User.insertMany(users)

}
seeduser().catch(err => {
    console.error("Error inserting :", err);
  });


// Simple route to get all users-----------
express.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);



});


express.listen(3000, () => {
  console.log("Server running on port 3000");
});