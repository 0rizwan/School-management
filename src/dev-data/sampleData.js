import fs from 'fs'
import mongoose from "mongoose";
import dotenv from 'dotenv/config';
import { DBName } from "../constants.js";
import { Class } from '../models/classModel.js';
import { Student } from "../models/studentModel.js";
import { Teacher } from '../models/teacherModel.js';

try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DBName}`)
    console.log('MongoDB connected', 'DB Host', connectionInstance.connection.host);
} catch (error) {
    console.log("MongoDB connection error ", error)
}

const dirName = import.meta.dirname;
const student = JSON.parse(fs.readFileSync(`${dirName}/student-data.json`, 'utf-8'))
const teacher = JSON.parse(fs.readFileSync(`${dirName}/teacher-data.json`, 'utf-8'))
const classData = JSON.parse(fs.readFileSync(`${dirName}/class-data.json`, 'utf-8'))

student.forEach(student => {
    const { firstName, dateOfBirth } = student;

    if (firstName && dateOfBirth) {
        const generatedPassword = firstName + "@" + new Date(dateOfBirth).getFullYear();
        student.password = generatedPassword;
    } else {
        console.error(`Missing firstName or dateOfBirth for student: ${JSON.stringify(student)}`);
    }
});

teacher.forEach(teacher => {
    const { firstName, dateOfBirth } = teacher;

    if (firstName && dateOfBirth) {
        const generatedPassword = firstName + "@" + new Date(dateOfBirth).getFullYear();
        teacher.password = generatedPassword;
    } else {
        console.error(`Missing firstName or dateOfBirth for teacher: ${JSON.stringify(teacher)}`);
    }
})

function randomId(arr) {
    return arr[Math.floor(Math.random() * 10)];
}

const importData = async () => {
    try {
        let teacherIds = [];
        let studentIds = [];
        const studentData = await Student.create(student);
        const teacherData = await Teacher.create(teacher);

        teacherData.forEach(teacher => {
            teacherIds.push(teacher._id);
        })

        studentData.forEach(student => {
            studentIds.push(student._id);
        })

        classData.forEach(elem => {
            elem.classTeacher = randomId(teacherIds)
        })

        let newStudents = []
        classData.forEach(elem => {
            elem.students.forEach(() => {
                newStudents.push(randomId(studentIds));
            })
            elem.students = newStudents;
        })

        classData.forEach(elem => {
            elem.subjectTeacher.forEach(elem => {
                elem.teacher = randomId(teacherIds)
            })
        })

        console.log(newStudents, "students")
        console.log(teacherIds, "teacherIds")
        await Class.create(classData);

        console.log('data loaded successfully')
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

const deleteData = async () => {
    try {
        await Student.deleteMany()
        await Teacher.deleteMany()
        console.log("data deleted successfully")
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}

