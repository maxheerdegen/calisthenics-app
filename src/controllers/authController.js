import { prisma } from '../config/client.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

async function signUp (req, res, next) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username,
                hashedPassword
            }
        })

        res.json(newUser);

    } catch(err) {
        return next(err);
    }
}

async function login (req, res) {
     try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                username,
            }
        })

        if(!user) {    
            return res.status(401).json({ message: 'Incorrect username or password' })
        }

        const match = await bcrypt.compare(password, user.hashedPassword);

        if(!match) {
            return res.status(401).json({ message: 'Incorrect username or password' })
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
}

function logout (req, res) {
    if (!req.cookies['jwt']) {
        res.status(401).json({ message: 'Invalid jwt'})
    }

    res
    .clearCookie('jwt')
    .status(200)
    .json({ message: 'Logout successful'})
}

export { signUp, login, logout };