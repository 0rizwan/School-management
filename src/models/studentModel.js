import mongoose from 'mongoose';
import { addRequiredValidation } from '../utils/schemaValidation.js'
import { User } from './userModel.js';

// Define the student schema
const studentSchema = new mongoose.Schema({
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
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
        }
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    parentDetails: [{
        relation: {
            type: String,
            enum: ['Mother', 'Father', 'Guardian'],
        },
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 'Invalid email format']
        }
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

addRequiredValidation(studentSchema, ['dateOfBirth', 'gender','street', 'pincode', 'city', 'state', 'country', 'parent relation', 'parent email', 'parent name', 'parent phone number'])

// Create the Student model from the schema
export const Student = User.discriminator('student', studentSchema);

