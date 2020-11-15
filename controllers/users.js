import { Users } from '../models/index.js';
import { createJwt } from '../utils/jwt.js';

async function createUser(userOpts) {
  if (!userOpts.username) {
    throw new Error('Did not supply username')
  }
  if (!userOpts.email) {
    throw new Error('Did not supply email')
  }
  if (!userOpts.password) {
    throw new Error('Did not supply password')
  }

  const user = await Users.create({
    ...userOpts, // TODO: Password not in plaintext
  })

  if (!user) {
    throw new Error('Error creating user')
  }


  const createdUser = await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image'],
    where: {
      username: user.username
    }
  })
  const token = await createJwt(createdUser.get())

  return {
    ...createdUser.get(),
    token
  }
}



async function verifyUser(userOpts) {
  if (!userOpts.email) {
    throw new Error('Did not supply email')
  }
  if (!userOpts.password) {
    throw new Error('Did not supply password')
  }

  const user = await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image', 'password'],
    where: {
      email: userOpts.email,
    }
  })

  if (!user) {
    throw new Error('No user with given email address')
  }

  if (user.password !== userOpts.password) {
    throw new Error('Password does not match')
  }
  
  const token = await createJwt(user.get())
  const userJson = {user:{
    ...user.get(),
    token
  }}
  delete userJson.user.password
  return userJson
}


async function updateUser(userOpts) {
  console.log(userOpts);
  const user = await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image', 'password'],
    where: {
         email:  userOpts.email 
    }
  })

  if (!user) {
    throw new Error('No user with given email address')
  }
  // console.log("user");
  // console.log(user.dataValues);
  // console.log("user");
  
  const updatedUser = await Users.update(userOpts, {
    where: {
      email : userOpts.email 
    }
  });
  console.log(updatedUser)

  const useru = {user: await Users.findOne({
    attributes: ['email', 'username', 'bio', 'image'],
    where: {
         email:  userOpts.email 
    }
  })}

  console.log(useru)
  // return updatedUser;
  return useru;
}

export {
    createUser,
    updateUser,
    verifyUser
}
