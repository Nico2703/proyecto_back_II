import { isValidPassword, generateToken } from '../utils.js';
import { userService } from '../repositories/index.js';

export const getUserByMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const userExists = await userService.getUserByMail(email);
        if (userExists) {
        return res.render('messages&error', { message: 'Usuario existente' });
        }
        next();
    } catch (error) {
        return res.render('messages&error', { message: 'Error al crear el usuario' });
    }
}

export const saveUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = { first_name, last_name, email, age, password };
        console.log("En controller OK");
        const result = await userService.saveUser(newUser);
        if (result) {
            res.render('messages&error', { messageOK: 'Usuario creado correctamente' });
        }
    } catch (error) {
        return res.render('messages&error', { message: 'Error al crear el usuario' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await userService.getUserByMail(email);
        if (!user) {
        return res.render('messages&error', { message: 'Credenciales inválidas - Usuario no encontrado' });
        }

        if (!isValidPassword(user, password)) {
            return res.render('messages&error', { message: 'Credenciales inválidas - Contraseña incorrecta' });
        }

        const jwt_token = generateToken({ user: user });
        res.cookie('currentUser', jwt_token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'produccion', 
            maxAge: 3600000,         
            sameSite: 'Strict',      
        }); 

        res.render('messages&error', { messageOK: 'Inicio de sesión exitoso' });
    } catch (error){
        return res.render('messages&error', { message: 'Error al iniciar sesión' });
    }
}

export const currentUser = async (req, res) => {
    try{
        const userInfo = req.user.user; 
        const userData = await userService.currentUser(userInfo); 
        
        res.render('home', { user: userData, error: null });
    } catch (error){
        res.render('messages&error', { message: 'Error al obtener los datos del usuario' });
    }
}
