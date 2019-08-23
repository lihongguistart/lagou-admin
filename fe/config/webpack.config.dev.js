const path = require('path')
// 编译html
const htmlWebpackPlugin = require('html-webpack-plugin')
// 拷贝打包编译文件
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // 模式
  mode: 'development',

  // 入口  没写./时直接去node_modules找
  entry: './src/app.js',

  // 出口 
  // 当前文件物理路径__dirname
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: 'app.js'
  },
  // 做webpack-dev-server的配置
  devServer: {
    contentBase: path.resolve(__dirname, '../dev'),
    port: 8800,//端口
    // host: "10.60.15.46",
    proxy:{
      '/api': {
        target : "http://localhost:3000"
      }
    }
  },

  // 编译html
  // 插件

  // loader们
  // art-template 模板引擎
  module: {
    rules: [
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']

      }
    ]
  },

  // 插件们
  plugins: [
    // 打包html+css+js
    new htmlWebpackPlugin({
      template: './index.html',//目标
      filename: 'index.html'
    }),

    // 拷贝 public source
    new copyWebpackPlugin([{
      from: './public',
      to: './public'
    }])
  ]
  
}