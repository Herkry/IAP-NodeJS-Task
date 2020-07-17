module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    // Create a new student
    app.post("/students", students.create);
  
    // Retrieve all students
    app.get("/students", students.findAll);
  
    // Retrieve a single student with studentId
    app.get("/students/:studentId", students.findOne);
  
    // Update a student with studentId
    app.put("/students/:studentId", students.update);
  
    // Delete a student with studentId
    app.delete("/students/:studentId", students.delete);
  
    // Create a new student
    app.delete("/students", students.deleteAll);
  };