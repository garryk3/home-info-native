import express from 'express';

import WaterHeater from './waterheater';
import System from './system';
import Light from './light';
import Auth from './auth';
import basicAuth from "express-basic-auth";
import users from "../config/users";

const router = express.Router();
const checkAuth = basicAuth({
	users,
	unauthorizedResponse: {
		code: 401,
		message: 'Пользователь не авторизован!'
	}
});

router.use('/waterheater',checkAuth, WaterHeater());
router.use('/system',checkAuth, System());
router.use('/light',checkAuth, Light());
router.use('/auth',checkAuth, Auth());

export default router