import { Router }  from 'express';
import { passportCall } from '../utils.js';
import { authorization } from '../middleware/authorization.js';

const router = Router();

router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/register', passportCall('jwt'), authorization("admin"), async (req, res) => {
    res.render('register');
})

export default router;