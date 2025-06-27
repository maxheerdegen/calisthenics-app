import { Router } from 'express';
import { signUp, login, logout } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);
authRouter.get('/logout', logout);

export { authRouter };