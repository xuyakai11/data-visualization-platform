const express = require('express') // 引入express框架
const app = express() // 实例化对象

const appData = require('./data.json') // 引入数据
const option  = appData.option // 取出数据

const apiRoutes = express.Router() // 引入路由
app.use('/api', apiRoutes)

module.exports = {
  baseUrl: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  productionSourceMap: true, // 生产环境是否生成sourceMap文件
  devServer: {
    // port: 9090, // 端口号
    // open: true, // 启动完自动打开浏览器
    before(app) {
      app.get('/api/option', (req, res) => {
        res.json({
          code: 0,
          data: option
        })
      })
    }
  }
}