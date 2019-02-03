import express from 'express';

import V1 from './v1';

const router = express.Router();


router.use('/v1', V1);

export default router