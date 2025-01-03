const db = require('../database/database')

const UserModel = {
    getAll: async () => {
        try {
            return await db.any('SELECT * FROM users;'); 
        } catch (e) {
            console.error('Error getting users: ', e);
            throw e;
        }
    },

    getById: async (id) => {
        try {
            return await db.one('SELECT * FROM users where user_id = $1', id);
        } catch (e) {
            console.error('Error getting user: ', e);
            throw e;
        }
    },

    create: async (user) => {
        try {
            return await db.one(
                `INSERT INTO users (
                    user_name, user_nickname, user_age, 
                    user_email, user_photo, user_goals
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id;`,
                [
                    user.user_name,
                    user.user_nickname,
                    user.user_age,
                    user.user_email,
                    user.user_photo,
                    user.user_goals,
                ]
            );
        } catch (e) {
            console.error('Error inserting user: ', e);
        }
    }
    
};

module.exports = UserModel;