var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 种cookie 插件
var cookieSesion = require('cookie-session');

// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionRouter = require('./routes/position')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cookie中间件
app.use(cookieSesion({
  name : 'session',
  maxAge : 24*60*60*1000,//过期时间
  keys: ['key1','key2']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//默认首页路由
app.use('/api/users', usersRouter);//用户登录信息路由
app.use('/api/position',positionRouter)//职位管理路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
