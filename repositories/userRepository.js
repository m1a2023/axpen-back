const UserModel = require('../models/userModel');

const UserRepository = {
    getAll: async () => {
        return await UserModel.getAll();
    },

    getById: async (id) => {
        return await UserModel.getById(id);
    },

    createUser: async (
        user_name, user_nickname, user_age, 
        user_email, user_photo, user_goals
    ) => {
        return await UserModel.create(
            user_name, user_nickname, user_age, 
            user_email, user_photo, user_goals
        );
    }
};

module.exports = UserRepository;