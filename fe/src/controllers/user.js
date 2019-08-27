
import userView from '../views/user.art'
let _url = ''
let _type = ''
export default{
  async render() {
    // userView是loader返回的函数
    // 此函数既可以用于路由的模板渲染（在res.render(userView(req, res), data)）
    // 又可以用于直接返回字符串（userView(data)）


    let result = await this.isSignin()
    console.log("重新加载")
    let html = userView({
      isSignin: result.ret,
      username : result.data.username
    })
    // console.log(html)
    $('.user-menu').html(html)
    console.log("绑定")
    this.bindEventToBtn()
  },
  isSignin() {
    return $.ajax({
      url: '/api/users/isSignin',
      headers:{
        'x-access-token':localStorage.getItem('x-access-token')
      },//首部上传数据
      // dataType: 'json',
      success(result) {
        console.log(result.data.msg)
        return result
      }
    })
  },


  bindEventToBtn() {
    console.log("触发")
    $('.hidden-xs').on('click', function() {

      // 获取点击目标spanid
      _type = $(this).attr('id')
      console.log(_type)

      // 根据id选择url
      _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
      $('input').val('')
    })

    $("#btn-signout").on('click',()=>{
      _type = ''
      console.log("退出")
      // cookie退出
      $.ajax({
        url: '/api/users/signout',
        success : this.bindEventSucc.bind(this),
        error: this.bindEventErr.bind(this)
        
      })

      // token退出
      localStorage.removeItem('x-access-token')
      location.reload()
    })

    $('#btn-submit').on('click', () => {
      console.log(this)
      // 表单数据
      let data = $('#user-form').serialize()
      console.log(_url,data)
      $.ajax({
        url: _url,
        type: 'POST',
        headers:{
          'x-access-token':localStorage.getItem('x-access-token')
        },//首部上传数据
        data,
        success:this.bindEventSucc.bind(this),
        // success(result) {
        //   console.log(result.data.msg)
        //   if (_type === 'btn-signin') {
        //     if (result.ret) {
        //       let html = userView({
        //         isSignin: true,
        //         username: result.data.username
        //       })
        //       console.log(this)
        //       $('.user-menu').html(html)
        //       // this.bindEventToBtn()
        //       // location.reload()


        //     } else {
        //       alert(result.data.msg)
        //     }
        //   } else {
        //     if (result.ret) {
        //       alert('注册成功，可以登录了')
        //     } else {
        //       alert(result.data.msg)
        //     }
        //   }
        // }
      })
    })
  },
  bindEventErr(result){
    alert(result.data.msg)
  },
  bindEventSucc(result,textStatus,xhr){
    console.log(result.data.msg)
    console.log(result)
    if(_type === 'btn-signup'){
      alert(result.data.msg)

    }else if(_type === "btn-signin"){
      if (result.ret) {
        _type = ''
        let token1 = result.data.token
        console.log("token1:"+token1)
        let html = userView({
          isSignin: true,
          username: result.data.username
        })
        $('#user-menu').html(html)

        // 取返回token
        console.log(textStatus)
        console.log(xhr)
        // console.log(xhr.getResponseHeader('x-access-token'))
        let token =  xhr.getResponseHeader('x-access-token')
        console.log("token:"+token)
        localStorage.setItem('x-access-token',token)


        this.bindEventToBtn()
        
      }else{
        alert(result.data.msg)
      }
    }else{
      console.log(1)
      location.reload()
    }
  }
}