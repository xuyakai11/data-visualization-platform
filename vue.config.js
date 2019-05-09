module.exports = {
  // 基本路径
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/static/custom/'
    : './',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('pwa')
  },
  css: { // 配置主题色
    loaderOptions: {
      less: {
        modifyVars: {
          /* 'primary-color': 'rgb(114, 46, 209)',
          'link-color': 'rgb(114, 46, 209)', */
          'border-radius-base': '5px',
          'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)'  // 浮层阴影
        },
        javascriptEnabled: true
      }
    }
  }
  /* devServer: { // 通过代理实现跨域请求
    proxy: {
      '/': {
        target: 'http://192.168.0.176:8080', // 真实地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/': '' // 将编译成‘’
        }
      }
    }
  } */
}