const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the enrollment schema
const enrollmentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
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
}, { timestamps: true });

// Create the Enrollment model from the schema
export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
