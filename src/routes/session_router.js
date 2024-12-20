import { Router }  from 'express';
import User from '../models/user_model.js';
import { isValidPassword, generateToken } from '../utils.js';
import { passportCall, authorization } from '../utils.js';

const router = Router();

router.post('/register', async (req, res) =>{
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
        return res.status(400).json({ message: 'Usuario existente' });
        }
        const newUser = new User({ first_name, last_name, email, age, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

router.post('/login', async (req,res) =>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas - Usuario no encontrado' });
        }

        if (!isValidPassword(user, password)) {
            return res.status(400).json({ message: 'Credenciales inválidas - Contraseña incorrecta' });
        }

        const jwt_token = generateToken({ user: user });
        res.cookie('currentUser', jwt_token, { httpOnly: true}); 
        res.json({ message: 'Inicio de sesión exitoso' }); 
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

router.get('/current', passportCall('jwt'), authorization("user") , (req, res) => {
    const userData = {
        _id: req.user.user._id,
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email,
        role: req.user.user.role
    };
    res.send({ status: 'success', payload: userData});
});    

export default router;