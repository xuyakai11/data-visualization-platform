<template>
<div>
  <a-card title="制作报表" :bordered="false"></a-card>
  <div class="reportmaking">
    <a-card :bordered="false" class="padding0">
    <a-steps class="steps" :current="current">
      <a-step title="填写库信息" />
      <a-step title="配置操作" />
    </a-steps>
    <div class="content">
      <keep-alive>  
        <step1 v-if="current === 0" @reportId="reportIdEmit($event)" :dataSourceList="dataSourceList" @nextStep="nextStep()"></step1>
        <step2 v-if="current === 1" :reportId="reportId" @prevStep="prevStep"></step2>
      </keep-alive>
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
  import { createDecorator } from 'vue-class-component';

 @Component({
   components: { Step1, Step2 }
 })
 export default class dataOrinig extends Vue {
  @Prop() private msg!: string;
  @Mutation changeOpenKeys: any
  current: number = 0
  dataSourceList: Array<object> = [] // 存放数据源
  reportId:string = ''

  created () {
    this.initDataFun();
  }
  reportIdEmit (val:any):void { // step1 传过来的reportid
    console.log(val);
    this.reportId = val; // 接收子组件传过来的参数，用于第二步请求
    /* (this as any).$post('custom/ReportManageDetail/getAllFields', { reportId: '108' }).then((res: any) => { // 请求报表所有字段
      if (res.state === 2000) {
        
      } else {
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch((err: any) => {
      console.log(err)
      this.dataSourceList = [];
      (this as any).$message.error('请求失败', 3); // 弹出错误message
    }); */
  }
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
  initDataFun ():void {
    (this as any).$post('custom/Datasmanage/getAllSourrceList').then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        this.dataSourceList = res.data;
      } else {
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch((err: any) => {
      console.log(err)
      this.dataSourceList = [];
      (this as any).$message.error('请求失败', 3); // 弹出错误message
    });
  }
 }
</script>
<style lang='scss'>
.reportmaking {
  padding: 10px;
  border-radius: 6px;
  .padding0 {
    .ant-card-body {
      padding: 0!important;
     /*  height: calc(90vh - 130px);
      height: -webkit-calc(90vh - 130px); //chrome
      height: -moz-calc(90vh - 130px); //firefox */
    }
    .steps {
      max-width: 750px;
      margin: 16px auto;
    }
  }
}
</style>
