
const path = require('path')

module.exports = {
  mode: "development",
  entry : "./src/app.js",


  output:{
    path : path.resolve(__dirname,'../dev'),
    filename: "app.js"
  },

  devServer : {
    contentBase : './dev',
    port: 8000
  }
}