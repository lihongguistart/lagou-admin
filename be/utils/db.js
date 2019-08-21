

// 连接数据库

// 引入
const mongoose = require('mongoose')

// 默认端口27017
mongoose.connect('mongodb://localhost:27017/lagou', { useNewUrlParser: true }) 
// lagou是数据库的名字，如果不存在该数据库，使用时自动创建

module.exports = mongoose