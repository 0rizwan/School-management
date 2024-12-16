import {Router} from 'express';
import { createAdmin, createClass, getAllClass, getAllStudent, getAllTeacher, studentRegistration, teacherRegistration } from '../controllers/adminController.js';
import { isAuthenticated, restrictTo } from '../middlewares/auth.js';
import Admin from '../models/adminModel.js';
import { login } from '../controllers/authController.js';
import { Student } from '../models/studentModel.js';
import { Teacher } from '../models/teacherModel.js';
const router = Router();

router.post('/login', login)
router.post('/createAdmin', isAuthenticated(Admin), restrictTo("Super Admin"), createAdmin)

router.post('/studentRegister',isAuthenticated(Admin), restrictTo("Super Admin", "Registrar", "Teacher Coordinator") , studentRegistration);
router.post('/teacherRegister', isAuthenticated(Admin), restrictTo("Super Admin", "Principal", "Teacher Coordinator"), teacherRegistration);
router.post('/createClass', isAuthenticated(Admin), restrictTo("Super Admin", "Principal", "Teacher Coordinator"), createClass);
router.get('/getAllStudent', isAuthenticated(Admin), restrictTo("Super Admin", "Principal", "Teacher Coordinator", "Teacher"), getAllStudent);
router.get('/getAllClass', isAuthenticated(Admin), restrictTo("Super Admin", "Principal", "Teacher Coordinator", "Teacher"), getAllClass);
router.get('/getAllTeacher', isAuthenticated(Admin), restrictTo("Super Admin", "Principal", "Teacher Coordinator", "Teacher"), getAllTeacher);

export default router;