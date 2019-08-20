var express = require('express');
var router = express.Router();

const Users = require('../controllers/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// router.all()  get post 都可以请求
router.post('/signup', Users.signup);

module.exports = router;
