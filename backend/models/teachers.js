const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);