const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the course schema
const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Create the Course model from the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
