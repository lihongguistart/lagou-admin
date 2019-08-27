
const tokenUtil = require('../utils/token')

// 中间键

module.exports = {
  async auth(req,res,next){
    console.log(888888)
    res.set('content-type', 'application/json;charset=utf-8')
 
    // let username = req.session.username
    let token = req.get('x-access-token')
    console.log(token)
    // 验证token
    let resul = await tokenUtil.verify(token)
    console.log(resul)
    let username = ''
    if(resul)
      username = resul.username
    console.log(username)
    if(username){
      next()     

    }else{
      res.render('fail',{
        data: JSON.stringify({
          msg:"请先登录",
        })
      })
    }
  }
}






