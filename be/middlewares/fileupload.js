
const path = require('path') //相对路径改觉对路径
const strRandom = require('string-random') //生成随机字符串
const multer = require('multer') //处理上传文件





let filename = ""

var storage = multer.diskStorage({

  // 图片文件转存
  destination: function (req, file, cb){

    // console.log("multer.diskStorage",req.body)
    cb(null, path.resolve(__dirname, '../public/uploads/'))
    // 需要手动添加文件夹
  },
  // 截取图片名
  filename: function(req, file, cb){
    console.log(req.body)
    filename = strRandom(8) + "-" +Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.'))

    req.filename = filename
    cb(null,filename)
  }
})


// 文件过滤
function fileFilter(req,file,cb){//1
  console.log(32,"fileFilter",req.body)
  let index = ['image/jpeg','image/jpg','image/gif','image/png'].indexOf(file.mimetype)
  
  if(index === -1){
    cb(null,false)
    cb(new Error('文件类型必须是.jpg, .jpeg, .gif, .png'))
  }else{
    cb(null, true)
  }
}

// 文件字段
let upload = multer({
  storage,
  fileFilter
}).single('companyLogo')

module.exports = (req,res,next)=>{
  upload(req, res, function(err){
    console.log(49,req.body)
    if(err){
      console.log(err.message)
      res.render("fail",{
        data:JSON.stringify({
          msg:err.message
        })
      })
    }else{
      // 中间件栈传参
      console.log(req.body)
      if(req.body.companyLogo ===''){
        delete req.body.companyLogo
      }
      
      next()
    }
  })
}
