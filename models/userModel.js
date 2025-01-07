const db = require("../database/database");

const UserModel = {
    getAll: async () => {
        try {
            return await db.any("SELECT * FROM users;");
        } catch (e) {
            console.error(`[${new Date()}] [Error getting users: ${e}]`);
        }
    },

    getById: async id => {
        try {
            return await db.one("SELECT * FROM users where user_id = $1", id);
        } catch (e) {
            console.error(`[${new Date()}] [Error getting user: ${e}]`);
        }
    },

    create: async user => {
        try {
            return await db.one(
                `
                INSERT INTO users (
                    user_name, user_nickname, user_age, 
                    user_email, user_photo, user_goals
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id;`,
                [user.user_name, user.user_nickname, user.user_age, user.user_email, user.user_photo, user.user_goals],
            );
        } catch (e) {
            console.error(`[${new Date()}] [Error inserting user: ${e}]`);
        }
    },

    updateById: async user => {
        const [id, updUser] = user;
        try {
            return await db.one(
                `
                UPDATE users SET 
                    (user_name, user_nickname, user_age, user_email, user_photo, user_goals) =
                    ($2, $3, $4, $5, $6, $7)
                WHERE user_id = $1
                RETURNING user_id;`,
                [
                    id,
                    updUser.user_name,
                    updUser.user_nickname,
                    updUser.user_age,
                    updUser.user_email,
                    updUser.user_photo,
                    updUser.user_goals,
                ],
            );
        } catch (e) {
            console.error(`[${new Date()}] [Error updating user: ${e}]`);
        }
    },

    updateByEmail: async user => {},

    deleteById: async id => {},

    deleteByEmail: async email => {},
};

module.exports = UserModel;
