import mongoose from 'mongoose';
import { addRequiredValidation } from '../utils/schemaValidation.js'
const Schema = mongoose.Schema;

// Define the student schema
const studentSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
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
    }
  },
  contact: {
    phoneNumber: {
      type: String,
      unique: true
    },
    email: {
      type: String,
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
      match: [/^[a-z0-9]+@([a-z]+\.)+[a-z]{2,4}$/i, 'Invalid email format']
    }
  }],
}, {
  timestamps: true
});

addRequiredValidation(studentSchema, ['firstName', 'lastName', 'dateOfBirth', 'gender', 'password', 'street', 'pincode', 'city', 'state', 'country', 'contact phone number', 'contact email', 'parent relation', 'parent email', 'parent name', 'parent phone number'])

studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Create the Student model from the schema
export const Student = mongoose.model('Student', studentSchema);

