import { Router } from 'express';
import { signUp, login, logout, me } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);
authRouter.post('/logout', logout);
authRouter.get('/me', isAuthenticated, me)

export { authRouter };