const { Sequelize, DataTypes } = require('sequelize');
// เชื่อมต่อกับฐานข้อมูล
const sequelize = require('../config/db');

// สร้าง Model สำหรับ Book
const Book = sequelize.define('Book', {
    bookId: { // เปลี่ยนชื่อจาก proId เป็น bookId
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER // ใช้ DataTypes ในการกำหนดประเภทข้อมูล
    },
    title: { // เปลี่ยนชื่อจาก proname เป็น title
        type: DataTypes.STRING,
        allowNull: false
    },
    author: { // เพิ่มฟิลด์ author เพื่อเก็บชื่อผู้เขียน
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        //allowNull: false
    },
    published_date: { 
        type: DataTypes.DATE,
        allowNull: false
    },
    available: { // ฟิลด์สำหรับแสดงสถานะการใช้งานของหนังสือ
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'books', // กำหนดชื่อตารางในฐานข้อมูล
});

module.exports = Book;
