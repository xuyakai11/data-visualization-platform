module.exports = {
  presets: [
    '@vue/app',
    Plugins: [
      [ // 配置antd按需加载组件代码和样式的babel插件
        "import",
        { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
      ]
    ]
  ]
}
