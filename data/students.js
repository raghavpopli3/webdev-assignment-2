// In-memory student data store
// Restrictions: No Database (MongoDB/MySQL), No Mongoose. Using Array and JSON Data Only.

let students = [
  { id: 1, name: "Rahul", course: "BCA" },
  { id: 2, name: "Priya", course: "BTech" },
  { id: 3, name: "Amit", course: "BCA" }
];

module.exports = students;
