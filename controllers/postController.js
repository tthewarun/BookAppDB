const Post = require('../models/Post');
const User = require('../models/User');

// สร้างโพสต์ใหม่
exports.createPost = async (req, res) => {
try {
const user = await User.findByPk(req.params.userId);
if (!user) {
return res.status(404).json({ error: 'User not found' });
}
const post = await user.createPost(req.body);
res.json(post);
} catch (err) {

res.status(500).json({ error: err.message });
}
};
// ดึงโพสต์ทั้งหมดของผู้ใช้
exports.getUserPosts = async (req, res) => {
try {
const posts = await Post.findAll({ where: { userId: req.params.userId } });
res.json(posts);
} catch (err) {
res.status(500).json({ error: err.message });
}
};
// แสดงโพสต์ทั้งหมด
exports.getPosts = async (req, res) => {
try {
const posts = await Post.findAll();
res.status(200).json(posts);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

// ค้นหาโพสต์ตาม ID
exports.getPostById = async (req, res) => {
try {
const post = await Post.findByPk(req.params.id);
if (!post) {
return res.status(404).json({ message: 'Post not found' });

}
res.status(200).json(post);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

// แก้ไขโพสต์
exports.updatePost = async (req, res) => {
try {
const [updated] = await Post.update(req.body, {
where: { id: req.params.id },
});
if (!updated) {
return res.status(404).json({ message: 'Post not found' });
}
const updatedPost = await Post.findByPk(req.params.id);
res.status(200).json(updatedPost);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

// ลบโพสต์
exports.deletePost = async (req, res) => {
try {
const deleted = await Post.destroy({
where: { id: req.params.id },
});
if (!deleted) {

return res.status(404).json({ message: 'Post not found' });
}
res.status(204).send();
} catch (error) {
res.status(500).json({ error: error.message });
}
};