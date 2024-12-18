import { Router } from 'express';
import { createAdmin, getAllStudent, getAllTeacher, studentRegistration, teacherRegistration } from '../controllers/adminController.js';
import { isAuthenticated, restrictTo } from '../middlewares/auth.js';
import { createClass, getAllClass } from '../controllers/classController.js';
const router = Router();

// Super Admin
router.post('/createAdmin', isAuthenticated, restrictTo(), createAdmin)

router.post('/studentRegister', isAuthenticated, restrictTo("registrar", "teacher coordinator"), studentRegistration);
router.post('/teacherRegister', isAuthenticated, restrictTo("principal", "teacher coordinator"), teacherRegistration);
router.post('/createClass', isAuthenticated, restrictTo("principal", "teacher coordinator"), createClass);
router.get('/getAllStudent', isAuthenticated, restrictTo("principal", "teacher coordinator", "Teacher"), getAllStudent);
router.get('/getAllClass', isAuthenticated, restrictTo("principal", "teacher coordinator"), getAllClass);
router.get('/getAllTeacher', isAuthenticated, restrictTo("principal", "teacher coordinator"), getAllTeacher);

export default router;