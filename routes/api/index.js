import express from 'express';

import usersRoutes from './users.js';

import userRoutes from './user.js';

import profilesRoutes from './profiles.js';

import tagsRoutes from './tags.js';

import articlesRoutes from './articles/index.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/user',userRoutes);
router.use('/profiles',profilesRoutes);
router.use('/tags',tagsRoutes);
router.use('/articles',articlesRoutes);

export default router ;