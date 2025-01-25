import { Router }  from 'express';
import { passportCall } from '../utils.js';
import { __dirname } from '../utils.js';
import { getUserByMail, loginUser, saveUser, currentUser } from '../controllers/user_controller.js';
import { ticketCreate } from '../controllers/ticket_controller.js';

const router = Router();

router.post('/register', getUserByMail, saveUser);

router.post('/login', loginUser); 

router.get('/current', passportCall('jwt'), currentUser);

router.post('/purchaseRegister', passportCall('jwt'), ticketCreate);

export default router;