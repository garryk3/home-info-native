import express from 'express';
import basicAuth from 'express-basic-auth';

import V1 from './v1';
import users from "./config/users";

const router = express.Router();
const checkAuth = basicAuth({
	users,
	unauthorizedResponse: {
		code: 401,
		message: 'Пользователь не авторизован!'
	}
});

router.use('/v1', checkAuth, V1);

export default router