
// 操作MongoDB数据库插件
const mongoose = require('../utils/db')

// 创建集合/表
const Users = mongoose.model('users',{
  username: String,
  password: String
})

module.exports = {
  // 保存用户名和秘密到users集合
  save({username,password}){
    console.log('存入数据库数据'+username,password)
    const users = new Users({
      username,
      password
    })
    return users.save()
  },

  // 根据用户名查找集合
  findOne(username){
    return Users.findOne({username})
  }
}