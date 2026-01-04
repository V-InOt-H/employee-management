const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());       
app.use(express.json());

// Import routes
const employeeRoutes = require("./routes/employeesroutes");

// Use routes
app.use("/employees", employeesroutes);

// Base route
app.get("/", (req, res) => {
  res.send("Employee Management API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});