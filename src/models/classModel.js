import mongoose from 'mongoose';


const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classNumber: { type: Number, required: true },
    section: {
        type: String,
        enum: ['A', 'B', 'C']
    },
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    subjectTeacher: [
        {
            teacher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher',
            },
            subjects: [
                { type: String, }
            ]
        }
    ],
    schedule: [{
        day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], required: true },
        subjects: [{
            subject: { type: String, required: true },
            time: { type: String, required: true },
        }]
    }],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export const Class = mongoose.model('Class', classSchema);
