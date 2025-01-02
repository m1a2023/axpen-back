const express = require('express');
const app = express();
const UserRepository = require('../repositories/userRepository');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserRepository.getAll();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({ ErrorMessage: "Failed fetch users " });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        
        try {

            const user = await UserRepository.getById(id);
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({ ErrorMessage: "Failed fetch user" });
        }
    },

    createUser: async (req, res) => {
        const { 
            user_name, user_nickname, user_age, 
            user_email, user_photo, user_goals
        } = req.body;
        
        const data = { 
            user_name, user_nickname, user_age, 
            user_email, user_photo, user_goals
        };

        try {
            const user = UserRepository.createUser(data);
            res.status(200).json({ id: user.id });
        } catch (e) {
            res.status(500).json({ ErrorMessage: "Failed create user" });
        }
    }
};

module.exports = UserController;