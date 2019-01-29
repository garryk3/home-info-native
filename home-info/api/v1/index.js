import express from 'express';

import WaterHeater from './waterheater';
import System from './system';
import Light from './light';

const router = express.Router();

router.use('/waterheater', WaterHeater());
router.use('/system', System());
router.use('/light', Light());

export default router