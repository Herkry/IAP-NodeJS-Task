const Student = require("../models/student.model.js");

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a student
    const student = new Student({
      email: req.body.email,
      name: req.body.name,
    });

    // Save Student in the database
    Student.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student."
        });
      else res.send(data);
});
  
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving students."
          });
        else res.send(data);
      });
  
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found student with id ${req.params.studentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving student with id " + req.params.studentId
            });
          }
        } else res.send(data);
      });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    Student.updateById(
      req.params.studentId,
      new Student(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found student with id ${req.params.studentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating student with id " + req.params.studentId
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.remove(req.params.studentId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found student with id ${req.params.studentId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete student with id " + req.params.studentId
            });
          }
        } else res.send({ message: `student was deleted successfully!` });
    });
};

// Delete all students from the database.
exports.deleteAll = (req, res) => {
    Student.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all students."
          });
        else res.send({ message: `All students were deleted successfully!` });
      });
};