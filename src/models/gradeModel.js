const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the grade schema
const gradeSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F'],
    required: true,
    default: 'F'
  },
  gradingDate: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: String,
    trim: true
  }
});

// Create the Grade model from the schema
const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
