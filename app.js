import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import './src/config/passport.js';
import { isAuthenticated } from './src/middleware/isAuthenticated.js';
import { authRouter } from './src/routes/authRoutes.js';
import { exerciseRouter } from './src/routes/exerciseRoutes.js';
import { workoutRouter } from './src/routes/workoutRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/exercises', isAuthenticated, exerciseRouter);
app.use('/api/workouts', isAuthenticated, workoutRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
})