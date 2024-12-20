import { Router }  from 'express';
import { __dirname } from '../utils.js';

const router = Router();

router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/register', async (req, res) => {
    res.render('register');
})

export default router;