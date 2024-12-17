import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Define the admin schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."],
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Please provide your email."],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format.']
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['Super Admin', 'Principal', 'Registrar', 'Finance Manager', 'Teacher Coordinator',],
        required: [true, "Please select a role."]
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    }
}, { timestamps: true });

// Middleware to hash the password before saving the admin
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to check if entered password matches the stored password
adminSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create the Admin model from the schema
export const Admin = mongoose.model('Admin', adminSchema);