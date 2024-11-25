import { Router } from 'express';
import { adminLogin, studentRegistration } from '../controllers/adminController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import Admin from '../models/adminModel.js';
const router = Router();

router.post('/login', adminLogin);
// router.post('/studentRegister', isAuthenticated(Admin), studentRegistration);
router.post('/studentRegister', studentRegistration);


export default router;