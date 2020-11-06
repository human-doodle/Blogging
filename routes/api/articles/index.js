import express from 'express';

import commentsRoutes from './comments.js';

const router = express.Router();

router.use('/comments', commentsRoutes);
export default router ;