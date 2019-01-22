
module.exports = {
  // 基本路径
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/static/custom/'
    : './',
  // 输出文件目录
  outputDir: 'dist'
}