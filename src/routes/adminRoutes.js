import {Router} from 'express';
import { adminLogin, createAdmin } from '../controllers/adminController.js';
const router = Router();

router.post('/login', adminLogin)
router.post('/signup', createAdmin)


export default router;