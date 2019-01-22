module.exports = {
  // 基本路径
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/static/custom/'
    : './',
  productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugins.delete('pwa')
   }
}