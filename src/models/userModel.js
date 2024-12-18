import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Base User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "firstname is required"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "lastname is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-z0-9.]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format.']
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6
    },
    userType: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        required: true,
    },
}, { discriminatorKey: 'userType', timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Base User Model
export const User = mongoose.model('User', userSchema);
