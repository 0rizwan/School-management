import {Router} from 'express';
import { adminLogin, createAdmin, studentRegistration } from '../controllers/adminController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import Admin from '../models/adminModel.js';
const router = Router();

router.post('/login', adminLogin)
router.post('/signup', createAdmin)

router.post('/studentRegister', isAuthenticated, studentRegistration);



export default router;