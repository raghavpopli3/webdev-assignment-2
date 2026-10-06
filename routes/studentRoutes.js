const express = require("express");
const router = express.Router();
let students = require("../data/students");

/**
 * @route   GET /students
 * @desc    Get all students
 * @access  Public
 * @status  200 OK
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

/**
 * @route   GET /students/:id
 * @desc    Get a single student by ID
 * @access  Public
 * @status  200 OK / 400 Bad Request / 404 Not Found
 */
router.get("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  // Validate ID format
  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID. ID must be a valid integer number."
    });
  }

  const student = students.find((s) => s.id === studentId);

  // Check if student exists
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  Public
 * @status  201 Created / 400 Bad Request
 */
router.post("/", (req, res) => {
  const { name, course } = req.body;

  // Validate input fields
  if (!name || !course || typeof name !== "string" || typeof course !== "string" || !name.trim() || !course.trim()) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. Both 'name' and 'course' are required and cannot be empty."
    });
  }

  // Generate unique incremental ID
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "New student created successfully.",
    data: newStudent
  });
});

/**
 * @route   PUT /students/:id
 * @desc    Update an existing student by ID
 * @access  Public
 * @status  200 OK / 400 Bad Request / 404 Not Found
 */
router.put("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  // Validate ID format
  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID. ID must be a valid integer number."
    });
  }

  const student = students.find((s) => s.id === studentId);

  // Check if student exists
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  const { name, course } = req.body;

  // Validate input
  if (!name && !course) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. Please provide at least 'name' or 'course' to update."
    });
  }

  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. 'name' must be a non-empty string."
      });
    }
    student.name = name.trim();
  }

  if (course !== undefined) {
    if (typeof course !== "string" || !course.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. 'course' must be a non-empty string."
      });
    }
    student.course = course.trim();
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student
  });
});

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student by ID
 * @access  Public
 * @status  200 OK / 400 Bad Request / 404 Not Found
 */
router.delete("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);

  // Validate ID format
  if (isNaN(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID. ID must be a valid integer number."
    });
  }

  const studentIndex = students.findIndex((s) => s.id === studentId);

  // Check if student exists
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${studentId} not found.`
    });
  }

  const [deletedStudent] = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent
  });
});

module.exports = router;
