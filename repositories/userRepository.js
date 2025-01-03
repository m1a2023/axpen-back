const UserModel = require('../models/userModel');

const UserRepository = {
    getAll: async () => {
        return await UserModel.getAll();
    },

    getById: async (id) => {
        return await UserModel.getById(id);
    },

    createUser: async (user) => {
        return await UserModel.create(user);
    }
};

module.exports = UserRepository;