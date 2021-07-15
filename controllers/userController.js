import { User } from "../models/user.js";

export const createUser = async function (request, response) {
    let user = await User.findOne({ name: request.body.name });
    if (user) {
        response.status(400).send(`Such user is already existed`)
    }
    else {
        const newUser = await new User({ name: request.body.name, surname: request.body.surname, email: request.body.email, password: request.body.password });
        newUser.save(function (err) {
            if (err) return console.log(err);
        });
        response.send(`Create new user:
                        user name: ${newUser.name}
                        user surname: ${newuser.surname}
                        email: ${newUser.email}`);
    }
}

export const deleteUser = async function (request, response) {
    try {
        let user = await User.findOne({ _id: request.params.id });
        if (user) {
            User.deleteOne({ _id: request.params.id }, function (err, result) {
                if (err) return console.log(err);
            });
            response.send(`Delete user ${user.name} ${user.surname}`);
        }
        else {
            response.send(`Can't find this user.`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't delete this user.`)
    }
}

export const updateUser = async function (request, response) {
    try {
        let user = await User.findOne({ _id: request.params.id });
        if (user && request.user.role == "admin") {
            User.updateOne({ _id: request.params.id }, { surname: request.body.surname }, { new: true }, function (err, result) {
                if (err) return console.log(err);
            });
            response.send(`Update user ${user.name} ${user.surname}`);
        }
        else if (user && request.user._id == request.params.id) {
            User.updateOne({ _id: request.params.id }, { surname: request.body.surname }, { new: true }, function (err, result) {
                if (err) return console.log(err);
            });
            response.send(`Update your profile ${user.name} ${user.surname}`);
        }
        else if (user && request.user._id !== request.params.id) {
            response.send(`It's not your profile. You don't have access yo update it`);
        }
        else {
            response.send(`Can't find this user`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't update this user.`)
    }
}

export const getUserById = async function (request, response) {
    try {
        let user = await User.findOne({ _id: request.params.id });
        if (user) {
            response.send(`user name: ${user.name}
                        user surname: ${user.surname}
                        email: ${user.email}`)
        }
        else {
            response.send(`Can't find such user`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see the user by id.`)
    }
}

export const getAllUsers = async function (request, response) {
    try {
        let users = await User.find({ role: "user" });
        if (users) {
            response.send(`${users}`)
        }
        else {
            response.send(`Can't find such users`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see all users.`)
    }
}
