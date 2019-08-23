

// 数据库操作

// 加密插件
const bcrypt = require('bcrypt')

module.exports = {
  
  // 使用异步方法，封装promise返回
  crypt(myPlaintextPassword){
    return new Promise( (resolve,reject)=>{
      bcrypt.genSalt(10,function(err,salt){
        // hash 加密方法
        bcrypt.hash(myPlaintextPassword,salt,(err,hash)=>{
          resolve(hash)
        })
      })
    })
  },


  // 使用同步方法加密
  hash(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
  },

  // 封装promise方法根据hash判断秘密是否匹配
  compare(myPlaintextPassword,hash){
    // console.log(4)

    return new Promise((resolve,reject)=>{
      bcrypt.compare(myPlaintextPassword,hash,function(err,res){
      // console.log(5)

      //   console.log(err,res)
        resolve(res)
      })
    })
  },

   //使用插件自带promise返回判断加密数据是否正确
  comparezd(originalPassword, hash) {
    return bcrypt.compare(originalPassword, hash)
  }

}



