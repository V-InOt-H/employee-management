import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
    age: ""
  });

  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error

  // -------------------------
  // Message helper
  // -------------------------
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMsgType(type);
    setTimeout(() => {
      setMessage("");
      setMsgType("");
    }, 3000);
  };

  // -------------------------
  // Fetch employees
  // -------------------------
  const fetchEmployees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // -------------------------
  // Handle input
  // -------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------
  // ADD employee
  // -------------------------
  const addEmployee = async () => {
    if (!form.id || !form.name || !form.department || !form.age) {
      return showMessage("❌ All fields are required", "error");
    }

    const exists = employees.find(emp => emp.id === Number(form.id));
    if (exists) {
      return showMessage("⚠️ Employee already exists", "error");
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(form.id),
        name: form.name,
        department: form.department,
        age: Number(form.age)
      })
    });

    showMessage("✅ Employee added successfully", "success");
    clearForm();
    fetchEmployees();
  };

  // -------------------------
  // UPDATE employee
  // -------------------------
  const updateEmployee = async () => {
    if (!form.id) {
      return showMessage("❌ Employee ID is required", "error");
    }

    const exists = employees.find(emp => emp.id === Number(form.id));
    if (!exists) {
      return showMessage("❌ Employee not found", "error");
    }

    await fetch(`${API_URL}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        department: form.department,
        age: Number(form.age)
      })
    });

    showMessage(
      `✏️ Employee updated (ID: ${form.id}, Name: ${form.name})`,
      "success"
    );

    clearForm();
    fetchEmployees();
  };

  // -------------------------
  // DELETE employee
  // -------------------------
  const deleteEmployee = async () => {
    if (!form.id) {
      return showMessage("❌ Employee ID is required", "error");
    }

    const exists = employees.find(emp => emp.id === Number(form.id));
    if (!exists) {
      return showMessage("❌ Employee not found", "error");
    }

    await fetch(`${API_URL}/${form.id}`, {
      method: "DELETE"
    });

    showMessage(
      `❌ Employee deleted (ID: ${form.id})`,
      "success"
    );

    clearForm();
    fetchEmployees();
  };

  const clearForm = () => {
    setForm({ id: "", name: "", department: "", age: "" });
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <p className="subtitle">MERN Stack Internship Project</p>

      {message && (
        <div className={`alert ${msgType}`}>
          {message}
        </div>
      )}

      {/* Form */}
      <div className="form">
        <input
          name="id"
          placeholder="Employee ID"
          value={form.id}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="add" onClick={addEmployee}>Add</button>
        <button className="update" onClick={updateEmployee}>Update</button>
        <button className="delete" onClick={deleteEmployee}>Delete</button>
        <button className="refresh" onClick={fetchEmployees}>Refresh</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr
              key={emp.id}
              onClick={() => setForm(emp)}
              title="Click to edit"
            >
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;