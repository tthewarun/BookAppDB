const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('book_db_bzrj', 'book_db_bzrj_user', 'VLVcF8YuLfZeDZwgi8NAvNDuXblzNnxh', {
host: 'dpg-cshjeuo8fa8c739ejau0-a',
dialect: 'postgres',
});

module.exports = sequelize;
//เชื่อมต่อฐานข้อมูล