import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the grade schema
const gradeSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'Subject',
	},
	grade: {
		type: String,
		enum: ['A', 'B', 'C', 'D', 'F'],
		default: 'F'
	},
	gradingDate: {
		type: Date,
	},
	comments: {
		type: String,
		trim: true
	}
}, { timestamps: true });

addRequiredValidation(teacherSchema, ['student', 'subject', 'grade'])

// Create the Grade model from the schema
export const Grade = mongoose.model('Grade', gradeSchema);