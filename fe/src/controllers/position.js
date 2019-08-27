import positionView from '../views/position.art'
import positionListView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'lodash'
const count = 3

function loadData(page,res){
  res.page = page
  $.ajax({
    url: '/api/position/list',
    headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    },//首部上传数据
    data:{
      page,
      count,
    },
    success(result){
      if(result.ret){

        // 当前页数据删除
        if(result.data.list.length === 0 && page !==0){
          page--
          loadData(page,res)
        }



        res.render(positionListView({
          ...result.data,
          showPage: true,
          page,
          pageCount: _.range(Math.ceil(result.data.total/count))
        }))
      }else{
        res.go('/home')
      }
    }
  })
}
function remove(id, res) {
  $.ajax({
    url: '/api/position/delete',
    type: 'DELETE',
    headers:{
      'x-access-token':localStorage.getItem('x-access-token')
    },//首部上传数据
    data: {
      id
    },
    success(result) {
      if (result.ret) {
        // res.go('/position?_=' + new Date().getTime())
        loadData(res.page, res)
      }
    }
  })
}

export default{
  render(req,res ,next){
    loadData(0,res)
    // res.render(positionView(req))
    // $.ajax({
    //   url : '/api/position/list',
    //   success(result){
    //     if(result.ret){
    //       res.render(positionView({
    //         list: result.data
    //       }))
    //     }else{
    //       res.go('/home')
    //     }
    //   }
    // })

    // 点击添加数据
    $('#router-view').on('click', '#addbtn' ,() => {
      res.go('/position_add')
    })

    // 点击修改数据
    $('#router-view').on('click', '.btn-update' ,function() {
      res.go('/position_edit', {
        id: $(this).attr('data-id')
      })
    })

    // 点击删除数据
    $('#router-view').on('click', '.btn-delete', function() {
      remove($(this).attr('data-id'), res)
    })

    // 点击页码刷新数据
    $('#router-view').on('click', '#page li[data-index]', function() {
      // console.log($(this).attr('data-index'))
      loadData($(this).attr('data-index'), res)
    })

    // 点击下一页
    $('#router-view').on('click','#next',function(){
      let currIndex = $('#page li.active').attr("data-index")
      let index = ~~currIndex +1
      if(index < ~~$(this).attr('totalpage')){
        loadData(index, res)
      }
    })


    // 点击上一页
    $('#router-view').on('click','#prev',function(){
      // console.log(0)
      let currIndex = $('#page li.active').attr("data-index")
      let index = ~~currIndex -1
      if(index > -1){
        loadData(index, res)
      }
    })

    // 点击搜索
    $('#router-view').on('click', '#possearch',function(){
      let keywords = $('#keywords').val()
      $.ajax({
        url:'/api/position/search',
        type: "POST",
        headers:{
          'x-access-token':localStorage.getItem('x-access-token')
        },//首部上传数据
        data:{
          keywords
        },
        success(result){
          if(result.ret){
            res.render(positionListView({
              ...result.data,
              showPage: false
            }))
          }
        }
      })
    })

  },

  add(req, res) {
    res.render(positionAddView({}))
    $('#posback').on('click', () => {
      res.back()
    })
    $('#possubmit').on('click', () => {
      $('#possave').ajaxSubmit({
        url: '/api/position/save',
        type: 'POST',
        headers:{
          'x-access-token':localStorage.getItem('x-access-token')
        },//首部上传数据
        clearForm: true,
        success(result){
          if(result.ret){
            res.back()
          }else{
            console.log(result.data.msg)
          }
        }
      })


      // let data = $('#possave').serialize()
      // $.ajax({
      //   url: '/api/position/save',
      //   type: 'POST',
      //   data,
      //   success(result) {
      //     if (result.ret) {
      //       res.back()
      //     } else {
      //       alert(result.data.msg)
      //     }
      //   }
      // })
    })
  },

  edit(req, res) {
    $.ajax({
      url: '/api/position/findone',
      type: 'POST',
      headers:{
        'x-access-token':localStorage.getItem('x-access-token')
      },//首部上传数据
      data: {
        id: req.body.id,
      },
      success(result) {
        console.log(result.data)
        
        res.render(positionEditView(result.data))

        $('#posback').on('click', () => {
          res.back()
        })

        $('#possubmit').on('click', () => {
          // patch请求只修改传入项，未传项不变，传空值置空
          $('#posedit').ajaxSubmit({
            url: '/api/position/patch',
            type:'PATCH',
            headers:{
              'x-access-token':localStorage.getItem('x-access-token')
            },//首部上传数据
            success(result){
              console.log(result.data)
              if(result.ret){
                res.back()
              }else{
                console.log(result.data.msg)
              }
            }
          })

          //// 更新修改全部，未传项置空
          // let data = $('#posedit').serialize()
          // $.ajax({
          //   url: '/api/position/put',
          //   type: 'PUT',
          //   data: data + '&id=' + req.body.id,
          //   success(result) {
          //     if (result.ret) {
          //       res.back()
          //     } else {
          //       alert(result.data.msg)
          //     }
          //   }
          // })
        })
      }
    })
    
  }

}