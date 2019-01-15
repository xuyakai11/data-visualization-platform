<template>
  <div>
    报表管理
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class statementManagement extends Vue {
 @Prop() private msg!: string;
  created () {

    }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
