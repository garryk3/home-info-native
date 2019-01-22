import express from 'express';

import Auth from './auth';
import WaterHeater from './waterheater';
import System from './system';

const router = express.Router();

router.use('/auth', Auth());
router.use('/waterheater', WaterHeater());
router.use('/system', System());

export default router