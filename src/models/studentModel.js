const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the student schema
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    contact: {
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format']
        }
    },
    parentDetails: [{
        relation: {
            type: String,
            enum: ['Mother', 'Father', 'Guardian'],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format']
        }
    }],
}, {
    timestamps: true
});

// Create the Student model from the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
