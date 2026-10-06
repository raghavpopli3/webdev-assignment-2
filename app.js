const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Welcome / Root route with API documentation
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Management REST API",
    version: "1.0.0",
    endpoints: {
      "GET /students": "Get all student records",
      "GET /students/:id": "Get a student record by ID",
      "POST /students": "Add a new student (Body: { name, course })",
      "PUT /students/:id": "Update student by ID (Body: { name?, course? })",
      "DELETE /students/:id": "Delete a student record by ID"
    }
  });
});

// Modular Routes
app.use("/students", studentRoutes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}. Route not found.`
  });
});

// Global Error Handler (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack || err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});

// Start the server only when executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Student API available at http://localhost:${PORT}/students`);
  });
}

module.exports = app;
