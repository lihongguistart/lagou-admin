import positionView from '../views/position.art'

export default{
  render(req,res ,next){
    res.render(positionView(req))

    $.ajax({
      url : '/api/position/list',
      success(result){
        if(result.ret){
          res.render(positionView({
            list: result.data
          }))
        }else{
          res.go('/')
        }
      }
    })
  }
}