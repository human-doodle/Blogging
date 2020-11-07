import jwt from 'jsonwebtoken';

const JWT_SECRET = 'lalala';

async function createJwt(user){
    const token = jwt.sign(user, JWT_SECRET);
    return token;
}

async function verifyJwt(token){
    const user = jwt.verify(token, JWT_SECRET);
    return user;
}

export{
    createJwt,
    verifyJwt
};
