import express from 'express'
import { loginUser, registerUser, deleteUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.delete('/delete',deleteUser);

export default userRouter;