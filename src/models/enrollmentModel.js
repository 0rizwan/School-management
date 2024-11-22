const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the enrollment schema
const enrollmentSchema = new Schema({
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
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  section: {
    type: String,
    required: true
  }
});

// Create the Enrollment model from the schema
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
