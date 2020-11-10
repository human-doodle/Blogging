import express from 'express';
import bodyParser from 'body-parser';
import { createUser , verifyUser} from '../../controllers/users.js';

const router = express.Router();

router.post('/', async (req, res)=>{
    console.log(req.body);
    const createdUser = await createUser(req.body.user)
    res.send(createdUser)
})

router.post('/login', async (req, res) => {
    try {
      const verifiedUser = await verifyUser(req.body.user);
      res.send(verifiedUser);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    }
  })


export default router ; 