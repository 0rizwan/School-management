const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the admin schema
const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Principal', 'Registrar', 'Finance Manager', 'Teacher Coordinator',],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  }
});

// Middleware to hash the password before saving the admin
const bcrypt = require('bcrypt');
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
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
