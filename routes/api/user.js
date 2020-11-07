import express from 'express';

import { userAuthViaToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', userAuthViaToken, (req, res) => {
  if (req.user) {
    res.send(req.user)
  }
})


export default router ;