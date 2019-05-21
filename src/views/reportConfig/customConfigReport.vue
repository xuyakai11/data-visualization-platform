<template>
  <div>
    <a-spin :spinning="spinning" delayTime="500">
    <header>
      <div>
        <a-tag color="#108ee9">添加组件</a-tag>
        <a-tag color="#87d068">完成</a-tag>
      </div>
    </header>
    <!-- <router-view></router-view> -->
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class customConfigReport extends Vue {
    spinning:boolean = true
    created () {

    }
    mounted () {
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    }
  }
</script>

<style lang='less' scoped>

</style>
