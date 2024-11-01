const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
postId: {
allowNull: false,
autoIncrement: true,
primaryKey: true,
type: Sequelize.INTEGER
},
title: {
type: DataTypes.STRING,
allowNull: false
},
content: {
type: DataTypes.TEXT,
allowNull: false
}
}, {
tableName: 'posts'

});

// ความสัมพันธ์ One-to-Many ระหว่าง User และ Post
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;