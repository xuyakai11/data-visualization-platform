<template>
  <div>
    报表制作
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class statement extends Vue {
  @Prop() private msg!: string;
  created () {}
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
