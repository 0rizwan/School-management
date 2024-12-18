import mongoose from 'mongoose';
import { User } from './userModel.js';

// Define the admin schema
const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['super admin', 'principal', 'registrar', 'finance manager', 'teacher coordinator',],
        required: [true, "Please select a role."]
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

// Create the Admin model from the schema
export const Admin = User.discriminator('admin', adminSchema);