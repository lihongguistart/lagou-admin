
// 连接数据库
const mongoose = require('../utils/db')

// 创建集合模板
const Model = mongoose.model('positions',{
  companyLogo: String,
  companyName : String,
  positionName: String,
  city: String,
  salary : String,
  createTime: String
})

module.exports = {
  //列表数据获取
  find({page, count}){
    console.log(page,count)
    return {
      list : Model.find({}).sort({_id: -1}).limit(~~count).skip(~~page*~~count),
      total: Model.count({})
    }
  },

  // 添加数据
  save(data){
    let model = new Model(data)
    return model.save()
  },

  findone(id){
    // return Model.find({_id : id})//返回数组
    return Model.findById(id)//返回对象

  },

  put(data){
    return Model.updateOne({_id:data.id},data)
  },
  patch(data){
    console.log(41 ,     data)
    debugger
    // debug
    return Model.updateOne({_id:data.id},data)
  },

  delete(id){
    return Model.deleteOne({_id: id})
  },

  search(keywords){
    return Model.find({
      $or:[
        {
          companyName: new RegExp(keywords,"gi")//全局不区分大小写
        },
        {
          positionName: new RegExp(keywords,"gi")
        }
      ]
    }).sort({_id:-1})
  }
}