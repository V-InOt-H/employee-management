const express = require("express");
const router = express.Router();

// Temporary in-memory data
let employees = [
  { id: 1, name: "Arun", dept: "IT", age: 23 }
];

// GET all employees
router.get("/", (req, res) => {
  res.json(employees);
});

// ADD new employee
router.post("/", (req, res) => {
  const { id, name, dept, age } = req.body;

  if (!id || !name || !dept || !age) {
    return res.status(400).json({
      message: "All fields (ID, Name, Department, Age) are required"
    });
  }

  const exists = employees.find(emp => emp.id === Number(id));
  if (exists) {
    return res.status(409).json({
      message: "Employee already exists"
    });
  }

  const newEmployee = {
    id: Number(id),
    name,
    dept,
    age: Number(age)
  };

  employees.push(newEmployee);

  res.json({
    message: "Employee added successfully",
    employees
  });
});
// UPDATE employee
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  let found = false;
  employees = employees.map(emp => {
    if (emp.id === id) {
      found = true;
      return { ...emp, ...req.body };
    }
    return emp;
  });

  if (!found) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee updated", employees });
});

// DELETE employee
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = employees.length;

  employees = employees.filter(emp => emp.id !== id);

  if (employees.length === before) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee deleted", employees });
});