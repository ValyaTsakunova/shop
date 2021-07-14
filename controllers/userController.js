import { User } from "../models/user.js";

export const createUser = async function(request, response){
        let user =  await User.findOne({ name: request.body.name });
        if (user) {
            response.status(400).send(`Such user is already existed`)
        }
        else {
            const newUser = new User({ name: request.body.name });
            newUser.save(function (err) {
                if (err) return console.log(err);
            });
            response.send(`Create new user
                        User name: ${newUser.name}`);
        }
}

export const deleteUser = function(request, response){
    response.send(`delete user`)
}

export const updateUser = function(request, response){
    response.send(`update user`)
}

export const getUserById = function(request, response){
    response.send(`get user by id`)
}

export const getAllUsers = function(request, response){
    response.send(`get all users`)
}
