import express from 'express';
import {returnArticles, feedArticles, getArticles, createArticles} from '../../../controllers/articles.js'
import { userAuthViaToken } from '../../../middlewares/auth.js'

import commentsRoutes from './comments.js';

const router = express.Router();

router.use('/comments', commentsRoutes);

// List Articles

router.get('/',userAuthViaToken, async(req, res)=>{
  try{  
      const articles = await returnArticles(req.user.username, req.query);
      res.json(articles);
    
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    });
}

  });

  
  //articles feed

  router.get('/feed',userAuthViaToken, async(req, res)=>{
    try{  
        console.log("ss")
        const articles = await feedArticles(req.user.username);
        res.json(articles);
      
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      });
  }
  
    });


    // GET /api/articles/:slug

    router.get('/:slug',userAuthViaToken, async(req, res)=>{
        try{  console.log(req.params)
           const articles = await getArticles(req.user.username,req.params);
            res.json(articles);
          
        } catch (err) {
          res.status(403).send({
            errors: {
              body: [ err.message ]
            }
          });
      }
      
        });

        // POST /api/articles

        router.post('/',userAuthViaToken, async(req, res)=>{
            try{ 
                console.log(req.body.article)
                const slug = await createArticles(req.user.username,req.body.article);
                const articles = await getArticles(req.user.username,slug);
                res.json(articles);
              
            } catch (err) {
              res.status(403).send({
                errors: {
                  body: [ err.message ]
                }
              });
          }
          
            });

export default router ;