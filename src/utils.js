import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passport from 'passport';
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY_JWT;
const EXPIRES_TIME_TOKEN = process.env.EXPIRES_TIME_TOKEN;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename)

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: EXPIRES_TIME_TOKEN });
    return token;
};

export const passportCall = (strategy) => {
    return async (req, res, next) => {
    passport.authenticate(strategy, function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.status(401).render('messages&error', { user: null, error: "Usuario no autenticado" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
};
