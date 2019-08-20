module.exports={
  signup(req,res,nex){
    let {username, password} = req.body
    if(username === 'admin'){
      res.send('succ')
      
    }else{
      res.send('fail')

    }
    // res.render()
  }
}