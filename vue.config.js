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
      '/api': {
        target: 'http://alsjdlfkajlsdjf', // 真实地址
        changeOrigin: true, // 是否跨域
      }
    }
  } */
}