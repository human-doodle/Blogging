import { Users, db } from '../models/index.js';
import sequelize from 'sequelize';
import pkg from 'sequelize';
const { QueryTypes } = pkg;


async function displayProfile(luser, userOpts){
    
    const user = await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image'],
        where: {
          username: userOpts.username,
        }
        
      })
    const following = await Users.findAll({
        include: { model: Users, as: 'Follower',required: true,
        through: {
          where: {
            following_id: luser
          }
        }
      }
      });
      var f = false;
    following.forEach(element => {
      if(element.dataValues.username === userOpts.username){
       f = true;
      }
    });
// console.log(JSON.stringify(following, null, 2));
    
    const profile = {'profile':{
        ...user.dataValues,
        following : f
    }}
    
return profile;
}


async function followProfile(luser, userOpts){

 try{
    const p = await db.query(
      'INSERT INTO follow_table VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :a, :b );',
      {
        replacements:{ a: userOpts.username,
        b: luser},
        
      }
    );
      console.log(JSON.stringify(p, null, 2));
    }catch (err) {
      
        errors: {
          body: [ err.message ]
        }
      
    }
 
  } 
   
 
  async function unfollowProfile(luser, userOpts){
  try{
      const p = await db.query(
        'DELETE FROM follow_table where follower_id = :a and following_id = :b ;',
        {
          replacements:{ a: userOpts.username,
          b: luser},
          
        }
      );
        console.log(JSON.stringify(p, null, 2));
      }catch (err) {
        
          errors: {
            body: [ err.message ]
          }
        
      }
   
    } 

export{
    displayProfile,
    followProfile,
    unfollowProfile
};