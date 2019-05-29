declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module 'qs' {
  const qs: any;
  export default qs;
}
declare module 'axios' {
  const axios: any;
  export default axios;
}
declare module 'echarts' {
  const echarts: any;
  export default echarts;
}
/* declare module 'v-charts' {
  const vCharts: any;
  export default vCharts;
} */
declare module 'ant-design-vue' {
  const antDesignVue: any;
  export default antDesignVue;
}
declare module 'vue-count-to' { // 数字滚动插件
  const vueCountTo: any;
  export default vueCountTo;
}
declare module 'vuedraggable' {
  const vuedraggable: any;
  export default vuedraggable;
}
declare module 'vue-grid-layout' {
  const vuegridlayout: any;
  export default vuegridlayout;
}
/* declare module 'vue-nestable' {
  const vuenestable: any;
  export default vuenestable;
} */
declare module 'moment' {
  const moment: any;
  export default moment;
}
declare module 'vue/types/vue' { // 声明为 Vue 补充的东西
  interface Vue {
    $Message: any,
    $Modal: any
  }
}