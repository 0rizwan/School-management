import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the grade schema
const gradeSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
		required: true
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true
	},
	grade: {
		type: String,
		enum: ['A', 'B', 'C', 'D', 'F'],
		required: true,
		default: 'F'
	},
	gradingDate: {
		type: Date,
	},
	comments: {
		type: String,
		trim: true
	}
});

addRequiredValidation(teacherSchema, ['firstName', 'lastName', 'email', 'phone', 'password', 'gender', 'street', 'pincode', 'city', 'state', 'country', 'dateOfBirth', 'hireDate', 'qualifications', 'experience'])

// Create the Grade model from the schema
export const Grade = mongoose.model('Grade', gradeSchema);


