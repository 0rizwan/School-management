import mongoose from 'mongoose';
import { addRequiredValidation } from '../utils/schemaValidation.js'
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Define the student schema
const teacherSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        // match: [/^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format'] //disable for side script
    },
    phone: {
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
    password: {
        type: String,
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

addRequiredValidation(teacherSchema, ['firstName', 'lastName', 'email', 'phone', 'password', 'gender', 'street', 'pincode', 'city', 'state', 'country', 'dateOfBirth', 'hireDate', 'qualifications', 'experience'])

teacherSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

teacherSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Create the Student model from the schema
export const Teacher = mongoose.model('Teacher', teacherSchema);

