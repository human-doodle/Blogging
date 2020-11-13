import { Users } from '../models/index.js';


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

export{
    displayProfile
};