import express from 'express';
const router = express.Router();
import getRampData from './controller';

router.get('/', getRampData);

export default router;
