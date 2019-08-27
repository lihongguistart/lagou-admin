
// 路由控制文件


// 1.安装路由插件sme-router
// 2.引入路由插件
// 3.new路由外框容器

import SMERouter from 'sme-router'

// 参数router-view 显示路由的地方，容器    html5路由和hash路由
const router = new SMERouter("router-view",'hash')



// 子路由

import user from '../controllers/user'
// 首页
import Home from '../controllers/home'
// 职位
import Position from '../controllers/position'

// import activeNavUtil from '../utils/active-nav'
// router.use(activeNavUtil)
// 中间件 高亮状态
router.use((req,res,next)=>{
  console.log(req.url)
  $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
  .parent()
  .addClass("active")
  .siblings()
  .removeClass("active")
})

// 路由方法 参数1/路径  参数2回调，回调参数（req接收数据，res返回数据，next执行下一个中间件
// 子路由方法引用
router.route('/home',Home.render)// 路由为/时切换会有bug，不建议直接使用/
router.route('/position',Position.render)
router.route('/position_add',Position.add)
router.route('/position_edit',Position.edit)


// 重定向，默认路由，自动跳转到默认路由
router.redirect('/position')

// 渲染用户信息模板
user.render()
export default router



