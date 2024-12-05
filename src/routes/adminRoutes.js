import {Router} from 'express';
import { createAdmin, studentRegistration } from '../controllers/adminController.js';
import { isAuthenticated, restrictTo } from '../middlewares/auth.js';
import Admin from '../models/adminModel.js';
import { login } from '../controllers/authController.js';
const router = Router();

router.post('/login',login)
router.post('/createAdmin', isAuthenticated(Admin), restrictTo("Super Admin"), createAdmin)

router.post('/studentRegister', isAuthenticated(Admin), restrictTo("Super Admin, Registrar, Teacher Coordinator") , studentRegistration);



export default router;