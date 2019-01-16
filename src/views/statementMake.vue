<template>
<div>
  <a-card title="制作报表" :bordered="false"></a-card>
  <div class="reportmaking">
    <a-card :bordered="false">
    <a-steps class="steps" :current="current">
      <a-step title="填写库信息" />
      <a-step title="配置操作" />
    </a-steps>
    <div class="content">
      <step1 v-if="current === 0" @nextStep="nextStep"></step1>
      <step2 v-if="current === 1" @nextStep="nextStep" @prevStep="prevStep"></step2>
      <!-- <step3 v-if="current === 2" @prevStep="prevStep" @finish="finish"></step3> -->
    </div>
  </a-card>
  </div>
</div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { interfaces } from 'mocha';
  import { State, Mutation } from 'vuex-class'
  import Step1 from '@/components/report/step1.vue'
  import Step2 from '@/components/report/step2.vue'

  interface axiosDatas {
    linkName: string,
    adress: string
  }

 @Component({
   components: { Step1, Step2 }
 })
 export default class dataOrinig extends Vue {
  @Prop() private msg!: string;
  @Mutation changeOpenKeys: any
  current: number = 0

  nextStep ():void { // 下一步
    if (this.current < 2) {
      this.current += 1
    }
  }
  prevStep ():void { // 上一步
    if (this.current > 0) {
      this.current -= 1
    }
  }
  /* finish ():void { // 配置完成，重新配置
    this.current = 0
  } */
 }
</script>
<style lang='scss' scoped>
.reportmaking {
  padding: 10px;
  border-radius: 6px;
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
}
</style>
