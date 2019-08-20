
// 路由控制文件


// 1.安装路由插件sme-router
// 2.引入路由插件
// 3.new路由外框容器

import SMERouter from 'sme-router'

// 参数router-view 显示路由的地方，容器    html5路由和hash路由
const router = new SMERouter("router-view",'hash')

// 子路由
// 首页
import Home from '../controllers/home'

import Position from '../controllers/position'


// 路由方法 参数1/路径  参数2回调，回调参数（req接收数据，res返回数据，next执行下一个中间件
// 子路由方法引用
router.route('/',Home.render)
router.route('/position',Position.render)

// 重定向，默认路由，自动跳转到默认路由
router.redirect('/')

export default router



