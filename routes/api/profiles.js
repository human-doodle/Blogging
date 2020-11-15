import express from 'express';
import { displayProfile } from '../../controllers/profiles.js'
import { followProfile, unfollowProfile } from '../../controllers/profiles.js'
import { userAuthViaToken } from '../../middlewares/auth.js'
const router = express.Router();

// GET /api/profiles/:username

router.get('/:username', userAuthViaToken ,async (req, res) =>{
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

// POST /api/profiles/:username/follow

router.post('/:username/follow', userAuthViaToken ,async (req, res) =>{
  if(req.user){
  try{
  await followProfile(req.user.username,req.params);
  const profile = await displayProfile(req.user.username,req.params);
  res.json(profile);
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    });
  }
  }
});

// DELETE /api/profiles/:username/follow

router.delete('/:username/follow', userAuthViaToken ,async (req, res) =>{
  if(req.user){
  try{
  await unfollowProfile(req.user.username,req.params);
  const profile = await displayProfile(req.user.username,req.params);
  res.json(profile);
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    });
  }
  }
});

export default router ;