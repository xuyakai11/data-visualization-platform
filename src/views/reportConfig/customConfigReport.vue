<template>
  <div>
    askldjfl lsdkjlf 
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class customConfigReport extends Vue {
    @Prop() private msg!: string;
    created () {

    }
  }
</script>

<style lang='less' scoped>

</style>
