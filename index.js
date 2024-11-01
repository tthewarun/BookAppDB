const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/productRoutes');
const app = express();
app.use(express.json());

//ระบุตําแหนKง url สําหรับเรียกดูรูปภาพ
app.use(express.static('public'));
app.use('/images', express.static('images'));

//ระบุตําแหนKง url สําหรักเรียกใช8งาน api
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
}).catch(error => console.error(error));