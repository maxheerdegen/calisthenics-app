import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import './src/config/passport.js';
import { isAuthenticated } from './src/middleware/isAuthenticated.js';
import { authRouter } from './src/routes/authRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.get('/protected', 
    isAuthenticated,
    (req, res) => {
        res.status(200).json({ message: 'Welcome to protected Route'})
})


app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
})