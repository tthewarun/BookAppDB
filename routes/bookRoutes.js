const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const bookController = require('../controllers/bookController'); // เปลี่ยนจาก productController เป็น bookController
const router = express.Router();

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์ที่อัพโหลด
const upload_path = './public/images';
// ตรวจสอบว่ามีโฟลเดอร์ uploads หรือไม่
if (!fs.existsSync(upload_path)) {
    // ถ้าไม่มีให้สร้างใหม่
    fs.mkdirSync(upload_path, { recursive: true });
}

// ตั้งค่า multer สำหรับจัดการไฟล์อัปโหลด
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดให้อัปโหลดไปไฟล์ไปไว้ที่โฟลเดอร์ public/images
        cb(null, upload_path);
    },
    filename: (req, file, cb) => {
        // ตั้งชื่อไฟล์โดยใช้วันที่และเวลาปัจจุบัน
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

// กำหนดเส้นทางหรือ URL สำหรับเรียกใช้งานแต่ละ API
router.post('/books', upload.single('image'), bookController.createBook); // เปลี่ยนเป็น createBook
router.get('/books', bookController.getAllBooks); // เปลี่ยนเป็น getAllBooks
// URL สำหรับแก้ไขข้อมูลหนังสือ
router.put('/books/:bookId', upload.single('image'), bookController.updateBook); // เปลี่ยนจาก :proId เป็น :bookId และฟังก์ชัน
// URL สำหรับลบข้อมูลหนังสือ
router.delete('/books/:bookId', bookController.deleteBook); // เปลี่ยนจาก :proId เป็น :bookId และฟังก์ชัน

module.exports = router;
