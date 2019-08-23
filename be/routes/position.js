var express = require('express');
var router = express.Router();

const positionController = require('../controllers/position')
// const userController = require('../controllers/users')
const authMiddleware = require('../middlewares/auth')


// 获取list接口之前，先加载路由中间件获取登录状态
/* GET home page. */
router.get('/list', authMiddleware.auth, positionController.list);//取
router.post('/save',authMiddleware.auth, positionController.save)//增
router.post('/findone',authMiddleware.auth, positionController.findone)//查
router.put('/put',authMiddleware.auth, positionController.put)//改
router.delete('/delete',authMiddleware.auth, positionController.delete)//删

module.exports = router;