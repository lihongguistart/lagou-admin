


// 中间键

module.exports = {
  auth(req,res,next){
    res.set('content-type', 'application/json;charset=utf-8')
 
    let username = req.session.username
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






