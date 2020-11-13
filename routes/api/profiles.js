import express from 'express';
import { displayProfile } from '../../controllers/profiles.js'
import { userAuthViaToken } from '../../middlewares/auth.js'
const router = express.Router();

router.get('/:username', userAuthViaToken ,async (req, res) =>{
    console.log(req.params);
    console.log(req.user.username);
    try{
    const profile = await displayProfile(req.user.username,req.params);
    res.json(profile);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      });
    }
});

export default router ;