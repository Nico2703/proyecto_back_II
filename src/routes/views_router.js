import { Router }  from 'express';
import { __dirname } from '../utils.js';
import path from 'path';

const router = Router();

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vista_registro.html')); 
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vista_login.html')); 
});

export default router;