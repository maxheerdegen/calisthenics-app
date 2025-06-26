import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { prisma } from './src/client.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import './src/config/passport.js';
import passport from 'passport';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post("/sign-up", async (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                hashedPassword: password,
            }
        })
        res.json(newUser);
    } catch(err) {
        return next(err);
    }
})

app.post("/login", async (req, res) => {

    try {
        const { username, password } = req.body;
        console.log(typeof username);

        const user = await prisma.user.findUnique({
            where: {
                username,
            }
        })

        console.log(user);

        if(!user) {    
            res.status(401).json({ message: 'Incorrect username or password' })
        }

        if(user.hashedPassword !== password) {
            res.status(401).json({ message: 'Incorrect username or password' })
        }

        const expirationTimeInMs = process.env.JWT_EXPIRATION_TIME;
        const secret = process.env.JWT_SECRET;

        const payload = {
            username: user.name,
            expiration: Date.now() + parseInt(expirationTimeInMs)
        }

        const token = jwt.sign(JSON.stringify(payload), secret);

        res
        .cookie('jwt', token, {
            httpOnly: true,
            secure: false
        })
        .status(200)
        .json({ message: 'Login successful'})


    } catch (err) {
        res.status(500).json({ message: err })
    }
})

app.get('/logout', (req, res) => {
    if (!req.cookies['jwt']) {
        res.status(401).json({ message: 'Invalid jwt'})
    }

    res
    .clearCookie('jwt')
    .status(200)
    .json({ message: 'Logout successful'})
})

app.get('/protected', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.status(200).json({ message: 'Welcome to protected Route'})
})


app.listen(process.env.PORT, () => {
    console.log(`App listens on port ${process.env.PORT}!`)
})