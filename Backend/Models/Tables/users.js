// const { DataTypes, Model } = require("sequelize");
// const connection = require("../../dbConnection");
// const { v4: uuid } = require("uuid");
// const { hash } = require("bcrypt");

// class users extends Model { }

// users.init(
//     {
//         userId: {
//             primaryKey: true,
//             type: DataTypes.STRING(100),
//         },
//         name: {
//             type: DataTypes.STRING(300),
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING(1000),
//             allowNull: false,
//         },
//         username: {
//             type: DataTypes.STRING(600),
//             unique: true,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING(100),
//         },
//     },
//     {
//         name: "users",
//         timestamps: true,
//         paranoid: true,     // deleted at 
//         sequelize: connection,
//     },
// );

// users.beforeCreate(async (user) => {
//     user.userId = uuid();
//     user.password = await hash(user.password, 10);
// })

// users.afterCreate(user => {
//     delete user.dataValues.password;
// })

// module.exports = users;


const { Model, DataTypes } = require('sequelize');
const { hash } = require('bcrypt');
const { v4: uuid } = require('uuid');
const connection = require("../../dbConnection")

class users extends Model { }

users.init(
    {
        // Unique identifier for the user
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },

        // User's full name
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Full name is required' },
            },
        },

        // Email for user authentication
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Invalid email address' },
            },
        },

        // Password for account security
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 64],
                    msg: 'Password must be between 8 and 64 characters',
                },
            },
        },
    },
    {
        modelName: 'Users',
        paranoid: true, // Enables soft deletes
        timestamps: true, // Adds createdAt and updatedAt fields
        sequelize: connection, // Database connection
    }
);

// Hooks to handle data processing before saving to the database
users.beforeCreate(async (user) => {
    try {
        // Assign a unique UUID for userId
        user.userId = uuid();

        // Hash the user's password before saving
        user.password = await hash(user.password, 10);
    } catch (error) {
        throw new Error('Error in processing user data before creation');
    }
});

// Error Handling Suggestion
users.handleError = (error) => {
    if (error.name === 'SequelizeUniqueConstraintError') {
        return 'The email address is already registered';
    } else if (error.name === 'SequelizeValidationError') {
        return error.errors.map((err) => err.message).join(', ');
    } else {
        return 'An unexpected error occurred';
    }
};

module.exports = users;
