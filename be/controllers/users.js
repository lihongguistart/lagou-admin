
// 操作数据库
const userModel = require('../models/users')

// 加解密
const tools = require('../utils/tools')

const tokenUtil = require('../utils/token')


module.exports={
  async isSignin(req,res,next){
    console.log(1313)
    res.set('content-type', 'application/json;charset=utf-8')
    // console.log(14,req.session)
    // cookie验证登录
    // let username = req.session.username

    // token验证登录
    // 获取请求头部token
    let token = req.get('x-access-token')
    // 验证token
    let resul = await tokenUtil.verify(token)
    let username = ''
    if(resul)
      username = resul.username

    
    console.log(username)
    if(username){
      // req.session.username = username

      next()
      res.render('succ',{
        data: JSON.stringify({
          msg:"已登录",
          username
        })
      })

    }else{
      res.render('fail',{
        data: JSON.stringify({
          msg:"请先登录",
          username: ""
        })
      })
    }
  },
  async signout(req,res,next){
    console.log(36+req.url)
    res.set('content-type', 'application/json;charset=utf-8')

    req.session = null
    res.render('succ',{
      data: JSON.stringify({
        msg: "退出成功"
      })
    })
  },

  async signup(req,res,next){
    // 接口返回请求头
    res.set('content-type','application/json;charset=utf-8')

    let {username, password} = req.body
    console.log("后台接收数据"+ username,password)
  
    // 判断用户是否存在
    let result = await userModel.findOne(username)
    if(!result){
      // 用户名不存在，则可以正常注册

      // 密码加密
      let newPassword = await tools.crypt(password)
      console.log('加密后：'+newPassword)
      // 保存到数据库
      let saveres = await userModel.save({
        username,
        password: newPassword
      })

      console.log(122)

      //  给前端返回接口数据
      if(saveres){
        res.render("succ",{
          data: JSON.stringify({
            
            msg: "注册成功，请登录！"
          })
        })
      }
    }else{
      console.log(124)
      // 到这里说明用户名存在
      res.render('fail',{
        data : JSON.stringify({
          msg: "用户名已存在"
        })
      })
    }
  },

  async signin(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8')

    console.log(0)
    let { username, password } = req.body
    console.log(username,password)

    // 从数据库里根据用户名取出用户信息
    let result = await userModel.findOne(username)
    console.log(result)
    console.log(1)
    if (result) {
      if (await tools.compare(password, result.password)) {
        console.log(2)
        // 往浏览器种植cookie，
        // res.cookie('name','tobi')
        // req.session.username = username

        // token配置
        let token =  tokenUtil.sign({username})
        // res.set('content-type',)//http协议首部
        res.set('X-access-token',token)//方法2，自定义头部返回token，参数1可随意取名，x业内默认自定义

        res.render('succ', {
          
          data: JSON.stringify({
            msg: '用户登录成功~',
            username,
            token//方法1
          })
        })
      } else {

        console.log(3)
        res.render('fail', {
          data: JSON.stringify({
            msg: '密码错误~'
          })
        })
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '账号不存在~'
        })
      })
    }
  }
}