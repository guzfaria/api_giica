const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    current_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'api_users',
    timestamps: true,
});
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;