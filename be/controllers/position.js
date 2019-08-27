
const posModel = require('../models/position')
const moment = require('moment')//日期格式控件

module.exports = {
  async list(req, res, next) {
    console.log(req.query.page,req.query.count,req.query)
    let {list, total} = posModel.find(req.query)
    if(await list){
      res.render("succ",{
        data: JSON.stringify({
          list : await list,
          total: await total
        })
      })
    }   
  },

  async save(req,res,next){
    console.log("save")
    // console.log(req.body)
    let result = await posModel.save({
      ...req.body,
      companyLogo: req.filename,

      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    console.log(result)
    if(result){
      res.render('succ',{
        data: JSON.stringify({
          msg:'数据添加成功'
        })
      })
    }else{
      res.render('fail',{
        data: JSON.stringify({
          msg:'数据添加失败'
        })
      })
    }
  },

  async findone(req,res,nex){
    let result = await posModel.findone(req.body.id)
    console.log(result)
    if(result){
      res.render('succ',{
        data: JSON.stringify(result)
        
      })
    }else{
      res.render('fail',{
        data: JSON.stringify({
          msg:'数据查找失败'
        })
      })
    }
  },

  async patch(req,res,next){
    console.log(62,req.filename)
    console.log(req.body)
    let data = {
      ...req.body,
      createTime:moment().format("YYYY-MM-DD HH:mm:ss")
    }
    if(req.filename){
      console.log(3333)
      data.companyLogo=req.filename
    }
    req.filename = ''
    // req.filename ? (data.companyLogo=req.filename) : ""
    console.log(data.companyLogo)
    let result = await posModel.patch(data)
    console.log(result)
    res.render('succ',{
      data:JSON.stringify({
        msg: "数据修改成功"
      })
    })
  },

  async put(req,res,next){
    let result = await posModel.put({
      ...req.body,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    console.log(result)
    if(result){
      res.render('succ',{
        data: JSON.stringify({
          msg:'数据修改成功'
        })
        
      })
    }else{
      res.render('fail',{
        data: JSON.stringify({
          msg:'数据修改失败'
        })
      })
    }
  },

  async delete(req,res,next){
    let result = await posModel.delete(req.body.id)
    console.log(result)
    if(result){
      res.render('succ',{
        data: JSON.stringify({
          msg: '数据删除成功'
        })
      })
    }else{
      res.render('fail',{
        data: JSON.stringify({
          msg: '数据删除失败'
        })
      })
    }
  },

  async search(req,res,next){
    let {keywords} = req.body
    let list = await posModel.search(keywords)
    res.render('succ',{
      data:JSON.stringify({
        list,
        total: -1//表示无意义值
      })
    })
  }
}