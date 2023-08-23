const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const database = require("./database");
const Vehicle = require("./models/Vehicle");

app.use(express.static(__dirname));
app.use(express.json());

//Database Connection
database
  .authenticate()
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.error("Error Connecting:", err);
  });

//Landing Page
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Fetch route
app.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add Route
app.post("/vehicles", async (req, res) => {
  const { vehicle_num, owner_num, entry_time } = req.body;
  try {
    const vehicle = await Vehicle.create({
      vehicle_num,
      owner_num,
      entry_time,
    });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Route
app.put("/vehicles/:id", async (req, res) => {
  const { exit_time } = req.body;
  const id = req.params.id;
  try {
    const vehicle = await Vehicle.update({ exit_time }, { where: { id } });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Route
app.delete("/vehicles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Vehicle.destroy({ where: { id } });
    res.status(200).json("Data removed successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running...");
  console.log("PORT:", PORT);
});
