
---

## 📌 Project Overview
The **Student Management REST API** is built using **Node.js** and **Express.js**. It provides full CRUD (Create, Read, Update, Delete) functionality to manage student records using an in-memory JSON array data store. The application adheres to RESTful architectural principles, modular routing, custom middleware logging, and proper HTTP error handling.

---

## 🚀 Features
- **Express Server Setup**: Clean and organized server implementation in `app.js`.
- **Modular Routing**: Student CRUD operations grouped cleanly in `routes/studentRoutes.js`.
- **Custom Logger Middleware**: Logs HTTP Method, Request URL, and Timestamp for every incoming request.
- **In-Memory JSON Data Store**: Pre-populated records in `data/students.js` adhering strictly to the assignment restriction (No Database / MongoDB / MySQL / Mongoose).
- **Comprehensive Error Handling & Status Codes**:
  - `200 OK`: Successful retrieval, update, or deletion.
  - `201 Created`: Successful creation of a new student.
  - `400 Bad Request`: Invalid ID format or missing/empty required fields (`name`, `course`).
  - `404 Not Found`: Student ID or requested route not found.
  - `500 Internal Server Error`: Global error handler for uncaught server errors.
- **Postman Testing Ready**: Pre-built Postman collection (`postman_collection.json`) included.

---

## 📁 Project Structure

```text
web dev assignment/
├── data/
│   └── students.js          # In-memory student dataset (Array & JSON)
├── middleware/
│   └── logger.js            # Custom logging middleware (Method, URL, Time)
├── routes/
│   └── studentRoutes.js     # Modular Express Router for CRUD endpoints
├── .gitignore               # Git ignore file (node_modules, logs)
├── app.js                   # Application entry point & server setup
├── package.json             # NPM dependencies and scripts
├── postman_collection.json  # Postman test collection
└── README.md                # Project documentation
```

---

## 🛠️ Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd "web dev assignment"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   - Production mode:
     ```bash
     npm start
     ```
   - Development mode (with live auto-reload using `nodemon`):
     ```bash
     npm run dev
     ```

4. **Verify the server is running:**
   Open your browser or Postman and visit:
   ```text
   http://localhost:3000
   ```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/students` | Get all student records | `200 OK` |
| **GET** | `/students/:id` | Get student by numerical ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/students` | Create a new student | `201 Created`, `400 Bad Request` |
| **PUT** | `/students/:id` | Update an existing student | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/students/:id` | Delete a student by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## 🧪 Testing with Postman & cURL

### 1. GET All Students
- **Method:** `GET`
- **URL:** `http://localhost:3000/students`
- **cURL:**
  ```bash
  curl -X GET http://localhost:3000/students
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 3,
    "data": [
      { "id": 1, "name": "Rahul", "course": "BCA" },
      { "id": 2, "name": "Priya", "course": "BTech" },
      { "id": 3, "name": "Amit", "course": "BCA" }
    ]
  }
  ```

---

### 2. GET Student by ID
- **Method:** `GET`
- **URL:** `http://localhost:3000/students/1`
- **cURL:**
  ```bash
  curl -X GET http://localhost:3000/students/1
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": { "id": 1, "name": "Rahul", "course": "BCA" }
  }
  ```

---

### 3. POST Create Student
- **Method:** `POST`
- **URL:** `http://localhost:3000/students`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Sneha Verma",
    "course": "MCA"
  }
  ```
- **cURL:**
  ```bash
  curl -X POST http://localhost:3000/students \
       -H "Content-Type: application/json" \
       -d '{"name": "Sneha Verma", "course": "MCA"}'
  ```
- **Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "New student created successfully.",
    "data": {
      "id": 4,
      "name": "Sneha Verma",
      "course": "MCA"
    }
  }
  ```

---

### 4. PUT Update Student
- **Method:** `PUT`
- **URL:** `http://localhost:3000/students/1`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "name": "Rahul Sharma",
    "course": "BCA Honours"
  }
  ```
- **cURL:**
  ```bash
  curl -X PUT http://localhost:3000/students/1 \
       -H "Content-Type: application/json" \
       -d '{"name": "Rahul Sharma", "course": "BCA Honours"}'
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Student updated successfully.",
    "data": {
      "id": 1,
      "name": "Rahul Sharma",
      "course": "BCA Honours"
    }
  }
  ```

---

### 5. DELETE Student
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/students/3`
- **cURL:**
  ```bash
  curl -X DELETE http://localhost:3000/students/3
  ```
- **Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Student deleted successfully.",
    "data": {
      "id": 3,
      "name": "Amit",
      "course": "BCA"
    }
  }
  ```

---

### 6. Error Handling Demonstrations

#### 404 Not Found (Invalid ID):
- **Request:** `GET http://localhost:3000/students/999`
- **Response (`404 Not Found`):**
  ```json
  {
    "success": false,
    "message": "Student with ID 999 not found."
  }
  ```

#### 400 Bad Request (Missing Fields):
- **Request:** `POST http://localhost:3000/students` with body `{}`
- **Response (`400 Bad Request`):**
  ```json
  {
    "success": false,
    "message": "Invalid input. Both 'name' and 'course' are required and cannot be empty."
  }
  ```

---

## 📬 Importing into Postman
1. Open Postman.
2. Click **Import** in the top-left navigation.
3. Select the `postman_collection.json` file located in this project directory.
4. Run any of the 7 pre-configured requests directly!

---

## 📊 Rubric Checklist
- [x] **Functionality (1.5 Marks)**: All 5 CRUD operations fully functional, in-memory array storage, custom logger middleware.
- [x] **API Design (0.5 Marks)**: Clean RESTful conventions, semantic routes, correct HTTP status codes (`200`, `201`, `400`, `404`, `500`).
- [x] **Clean Code (0.5 Marks)**: Modular folder architecture (`routes/`, `middleware/`, `data/`), clear documentation, JSDoc annotations, and descriptive variables.
