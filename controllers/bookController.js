const Book = require('../models/Book');

// ฟังก์ชันสำหรับเพิ่มข้อมูลหนังสือใหม่
exports.createBook = async (req, res) => {
    try {
      const { title, author, published_date } = req.body;
      const image_file_name = req.file ? req.file.filename : null;
  
      if (!title || !author || !published_date) {
        return res.status(400).json({ message: 'Title, author, and published date are required.' });
      }
  
      const book = await Book.create({
        title: title,
        author: author,
        published_date: published_date,
        image: image_file_name
      });
  
      res.status(201).json({ message: 'Add new book successfully', book });
    } catch (error) {
      console.error(error); // แสดงข้อผิดพลาดใน console
      res.status(500).json({ message: 'Failed to add new book', error: error.message });
    }
  };
  

// แสดงข้อมูลหนังสือทั้งหมด
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ลบข้อมูลหนังสือ
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId); // เปลี่ยนจาก proId เป็น bookId
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// แก้ไขข้อมูลหนังสือ
exports.updateBook = async (req, res) => {
  try {
    const { title, author, published_date } = req.body;
    const image_file_name = req.file ? req.file.filename : null;

    const book = await Book.findByPk(req.params.bookId); // เปลี่ยนจาก proId เป็น bookId
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.update({
      title: title,
      author: author,
      published_date: published_date,
      image: image_file_name // ต้องแน่ใจว่า Model มีฟิลด์นี้
    });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
