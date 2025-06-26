import express, { urlencoded } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { prisma } from './src/client.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/sign-up", async (req, res, next) => {
    console.log(req.body);
    let { name, password } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                hashedPassword: password,
            }
        })
        res.json(newUser);
    } catch(err) {
        return next(err);
    }
})


app.listen(process.env.PORT, () => {
    console.log(`App listens on port ${process.env.PORT}!`)
})