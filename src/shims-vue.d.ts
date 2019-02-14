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
declare module 'ant-design-vue' {
  const antDesignVue: any;
  export default antDesignVue;
}
declare module 'vuedraggable' {
  const vuedraggable: any;
  export default vuedraggable;
}
declare module 'vue/types/vue' { // 声明为 Vue 补充的东西
  interface Vue {
    $Message: any,
    $Modal: any
  }
}