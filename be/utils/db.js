
// 引入
const mongoose = require('mongoose')

// 默认端口27017
mongoose.connect('mongodb://localhost:27017/lagou', { useNewUrlParser: true }) // lagou是数据库的名字

module.exports = mongoose