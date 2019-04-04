<template>
  <div>
    账号管理
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class XXX extends Vue {
    data:object = [{
      children: [],
      icon: "database",
      is_display: 1,
      key: 26,
      matePerMiss: true,
      name: "数据源管理",
      parent_id: 0,
      path: "/dataOriginManagement"
    }]
    created () {

    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
