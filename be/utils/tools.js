

// 数据库操作

// 加密插件
const bcrypt = require('bcrypt')

module.exports = {
  
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

  // 根据hash判断秘密是否匹配
  compare(myPlaintextPassword,hash){
    console.log(4)

    return new Promise((resolve,reject)=>{
      bcrypt.compare(myPlaintextPassword,hash,function(err,res){
      // console.log(5)

      //   console.log(err,res)
        resolve(res)
      })
    })
  }
}



