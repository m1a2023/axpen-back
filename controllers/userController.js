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
        const { user_name, user_nickname, user_age, user_email, user_photo, user_goals } = req.body;
    
        if (!user_name || !user_nickname) {
            return res.status(400).json({ message: "user_name and user_nickname are required" });
        }
    
        try {
            const user = await UserRepository.createUser({
                user_name,
                user_nickname,
                user_age,
                user_email,
                user_photo,
                user_goals,
            });
            res.status(201).json({ id: user.user_id });
        } catch (e) {
            console.error('Error inserting user: ', e);
            res.status(500).json({ ErrorMessage: "Failed to create user" });
        }
    }
};

module.exports = UserController;