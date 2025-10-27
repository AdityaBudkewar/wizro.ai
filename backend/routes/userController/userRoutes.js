import express from 'express';

import userController from './userController.js';

const userRouter = express.Router();

userRouter.route('/register').post(userController.register);
userRouter.route('/login').post(userController.login);
userRouter.route('/updateUser').post(userController.updateUser);
userRouter.route('/deleteUser').post(userController.deleteUser);

export default userRouter;
