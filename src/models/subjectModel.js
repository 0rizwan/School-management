const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the subject schema
const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
        unique: true
    },
    subjectCode: {
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
}, { timestamps: true });

// Create the subject model from the schema
export const Subject = mongoose.model('subject', subjectSchema);
