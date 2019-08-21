
import userView from '../views/user.art'
let _url = ''
let _type = ''
export default{
  async render() {
    // userView是loader返回的函数
    // 此函数既可以用于路由的模板渲染（在res.render(userView(req, res), data)）
    // 又可以用于直接返回字符串（userView(data)）


    let result = await this.isSignin()

    let html = userView({
      isSignin: result.ret,
      username : result.data.username
    })
    // console.log(html)
    $('.user-menu').html(html)
    this.bindEventToBtn()
  },
  isSignin() {
    return $.ajax({
      url: '/api/users/isSignin',
      dataType: 'json',
      success(result) {
        console.log(result)
        return result
      }
    })
  },

  bindEventToBtn() {
    $('.hidden-xs').on('click', function() {

      // 获取点击目标spanid
      _type = $(this).attr('id')
      console.log(_type)

      // 根据id选择url
      _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
      $('input').val('')
    })

    $('#btn-submit').on('click', () => {
      // 表单数据
      let data = $('#user-form').serialize()
      console.log(_url,data)
      $.ajax({
        url: _url,
        type: 'POST',
        data,
        success(result) {
          if (_type === 'btn-signin') {
            if (result.ret) {
              let html = userView({
                isSignin: true,
                username: result.data.username
              })
          
              $('.user-menu').html(html)
            } else {
              alert(result.data.msg)
            }
          } else {
            if (result.ret) {
              alert('注册成功，可以登录了')
            } else {
              alert(result.data.msg)
            }
          }
        }
      })
    })
  }
}