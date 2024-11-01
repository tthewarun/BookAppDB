const Product = require('../models/product');
// ฟûงกgชันสําหรับเพิ่มข8อมูลสินค8าใหมK
exports.createProduct = async (req, res) => {
try {
// รับข8อมูล proname และ price
const { proname, price } = req.body;
// รับข8อมูลชื่อไฟลgรูปภาพ
const image_file_name = req.file ? req.file.filename : null;

const product = await Product.create({
proname: proname,
image: image_file_name,
price: price
});
res.status(200).json({ message: 'Add new product successfully', product });
} catch (error) {
res.status(500).json({ message: 'Failed to add new product', error });
}
};
// แสดงข8อมูล products ทั้งหมด
exports.getdata = async (req, res) => {
try {
const products = await Product.findAll();
res.status(200).json(products);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

// ลบข8อมูลสินค8า
exports.deleteProduct = async (req, res) => {
try {
const product = await Product.findByPk(req.params.proId);
if (!product) {
return res.status(404).json({ error: 'Product not found' });
}

await product.destroy();
res.json({ message: 'Product deleted' });

} catch (err) {
res.status(500).json({ error: err.message });
}
};

// แก8ไขข8อมูลสินค8า
exports.updateProduct = async (req, res) => {
try {
// รับข8อมูล proname และ price
const { proname, price } = req.body;
// รับข8อมูลชื่อไฟลgรูปภาพ
const image_file_name = req.file ? req.file.filename : null;

const product = await Product.findByPk(req.params.proId);
if (!product) {
return res.status(404).json({ error: 'Product not found' });
}
await product.update(
{
proname: proname,
image: image_file_name,
price: price
}
);
res.json(product);
} catch (err) {
res.status(500).json({ error: err.message });
}
};