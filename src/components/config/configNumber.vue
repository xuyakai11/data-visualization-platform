<template>
  <div class="config"> <!-- 饼图 -->
    <!-- <p>{{title}}</p> -->
    <canvas class="map" ref="mapCanvas" width="200px" height="200px"></canvas>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'
  @Component({
    components: {}
  })
  export default class configNumber extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的title
    @Prop({}) data!:any // 接收父组件传过来的数据
    @Prop({}) styles!:any

    chartData:Array<any> = [
      { 'name': '语陪', 'value': 510 },
      { 'name': '活动', 'value': 498 },
      { 'name': '咨询', 'value': 210 },
      { 'name': '定金', 'value': 410 },
      { 'name': '订单', 'value': 498 },
      { 'name': '垃圾', 'value': 550 },
      { 'name': '无聊', 'value': 498 }
    ]

    seriesData:Array<any> = []
    legendData:Array<string> = []
    @Watch('styles') patintingWatch (newVal:any, oldVal:any) {
      console.log(newVal)
      if (newVal && JSON.stringify(newVal) !== '{}') {
        console.log(1)
        this.$nextTick(() => {
          
        })
      } else {
        
      }
    }
    /* @Watch('data', { deep: true, immediate: true }) dataWatch (newVal:Array<any>, oldVal:Array<any>) {
      if (newVal !== oldVal && newVal.length) {
        this.seriesData = []
        this.legendData = []
        newVal.map((v:any, i:number) => {
          if (v.money_clean > 0) {
            this.seriesData.push({ name: v.name, value: v.money_clean })
            this.legendData.push(v.name)
          }
        })
        this.initEchartsFun(this.seriesData, this.legendData)
      }
    } */
    mounted () {
     // console.log((this.$refs.map as HTMLDivElement).style.fontSize = 100/10 + 'vh')
     let canvas:any = this.$refs.mapCanvas as HTMLDivElement
      if (canvas.getContext) {
          let ctx = canvas.getContext('2d');
          ctx.fillText('什么玩意儿', 5, 30);
      }
    }
  }
</script>

<style lang='less' scoped>
.config {
  height: 100%;
  width: 100%;
  padding: 10px;
  font-size: 40px;
  p {
    font-size: 14px;
    color: #afbdd1;
  }
  .map {
    height: 100%;
    width: 100%;
    font-size: 2em;
  }
}
</style>
