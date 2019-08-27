var express = require('express');
var router = express.Router();

const positionController = require('../controllers/position')
const userController = require('../controllers/users')
const authMiddleware = require('../middlewares/auth')
const fileuploadMiddleware = require('../middlewares/fileupload')


// 获取list接口之前，先加载路由中间件获取登录状态
/* GET home page. */
console.log("职位接口")
router.get('/list', authMiddleware.auth, positionController.list);//取
// router.get('/list', userController.isSignin, positionController.list);//取
router.post('/save',authMiddleware.auth, fileuploadMiddleware,positionController.save)//增
router.post('/findone',authMiddleware.auth, positionController.findone)//查
// router.put('/put',authMiddleware.auth, positionController.put)//改

router.patch('/patch',authMiddleware.auth, fileuploadMiddleware,positionController.patch)//改
router.delete('/delete',authMiddleware.auth, positionController.delete)//删
router.post('/search',authMiddleware.auth, positionController.search)//搜索

module.exports = router;