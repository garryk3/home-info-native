import express from 'express';
import basicAuth from 'express-basic-auth';

import users from './../config/users';

import Auth from './auth';
import WaterHeater from './waterheater';
import System from './system';
import Light from './light';

const router = express.Router();

router.use('/auth', Auth());
router.use('/waterheater', basicAuth(users), WaterHeater());
router.use('/system', basicAuth(users), System());
router.use('/light', basicAuth(users), Light());

export default router