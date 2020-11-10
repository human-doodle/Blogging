import express from 'express';

import { userAuthViaToken } from '../../middlewares/auth.js';

import { updateUser } from '../../controllers/users.js';

const router = express.Router();

router.get('/', userAuthViaToken, (req, res) => {
  if (req.user) {
    // 
    res.send(req.user)
  }
})


router.put('/', userAuthViaToken, async ( req , res) => {
    console.log(req.body.user)
    if (req.user){

        try {
            const updatedUser = await updateUser(req.body.user);
            res.send(updatedUser);
          } catch (err) {
            res.status(403).send({
              errors: {
                body: [ err.message ]
              }
            })
          }
          
    }
    
  })




export default router ;