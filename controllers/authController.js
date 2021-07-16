import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

const accessTokenSecret = 'youraccesstokensecret';

export const registration = async function(request, response){
    let user =  await User.findOne({ name: request.body.name, password: request.body.password });
    if (user) {
        response.status(400).send(`Such user is already existed`)
    }
    else {
        const newUser = await new User({ name: request.body.name, surname: request.body.surname, email: request.body.email, password: request.body.password, role: request.body.role });
        newUser.save(function (err) {
            if (err) return console.log(err);
        });
        response.send(
            `Registration
            Create new user
            User name: ${newUser.name} ${newUser.surname}`);
    }
}

export const authorization = async function(request, response){
    const user = await User.findOne({ name: request.body.name, password: request.body.password });
    if (!user) {
        response.send('Name or password incorrect');
        
    } else if (user.role == 'admin') {
        const accessToken = jwt.sign({ name: user.name, role: user.role, _id: user._id }, accessTokenSecret, { expiresIn: '56565656m' });
        response.json({
            accessToken
        });
    }
    else if(user.role == 'user'){
        const accessToken = jwt.sign({ name: user.name, role: user.role, _id: user._id }, accessTokenSecret, { expiresIn: '3338383m' });
        response.json({
            accessToken
        });
    }
}

export const authenticateJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return response.sendStatus(403);
            }
            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
}

export const checkAccess = function (request, response, next) {
    if (request.user.role !== 'admin') {
        return response.status(403).send(`You don't have access`);
    }
    next()
};