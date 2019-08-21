var express = require('express');
var router = express.Router();

const positionController = require('../controllers/position')
const userController = require('../controllers/users')


// 获取list接口之前，先加载路由中间件获取登录状态
/* GET home page. */
router.get('/list', userController.isSignin);

module.exports = router;