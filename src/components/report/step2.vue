<template>
  <div>
    <a-form>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class sterp2 extends Vue {
   loading: boolean = false

  nextStep ():void {
    let _this = this
    _this.loading = true
    setTimeout(() => {
      _this.$emit('nextStep')
    }, 1000)
  }
  prevStep ():void {
    this.$emit('prevStep')
  }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
</style>
