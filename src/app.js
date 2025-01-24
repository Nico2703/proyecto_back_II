import express from 'express';
import path from 'path';
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport_config.js';
import handlebars from 'express-handlebars';

import sessionRouter from './routes/session_router.js';
import viewsRouter from './routes/views_router.js';
import cartRouter from './routes/cart_router.js';

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

mongoose.connect( MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a la base de datos en MongoDB');
}).catch(error => console.log(error));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewsRouter);
app.use('/', cartRouter);
app.use('/api/sessions', sessionRouter);

app.listen(8080, () => {
    console.log('Conectado al servidor en puerto 8080');
});
