import mongoose from 'mongoose';
import { addRequiredValidation } from '../utils/schemaValidation.js'
import { User } from './userModel.js';

// Define the student schema
const teacherSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true,
        trim: true,
    },
    department: {
        type: String,
        enum: ['Pre-primary', 'Primary', 'Secondary', 'High School', 'Others'],
    },
    subjects: [{
        type: String,
    }],
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
    },
    dateOfBirth: {
        type: Date,
    },
    hireDate: {
        type: Date,
    },
    qualifications: {
        type: String,
    },
    experience: {
        type: Number, // in years
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        country: {
            type: String,
            default: 'India',
        }
    },
    role: {
        type: String,
        enum: ['Teacher', 'HOD', 'Vice Principal', 'Principal'], // Roles within the teaching staff
        default: 'Teacher',
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

addRequiredValidation(teacherSchema, ['phoneNumber', 'gender', 'street', 'pincode', 'city', 'state', 'country', 'dateOfBirth', 'hireDate', 'qualifications', 'experience'])

// Create the Student model from the schema
export const Teacher = User.discriminator('teacher', teacherSchema);
