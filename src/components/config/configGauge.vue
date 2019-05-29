<template>
  <div class="config"> <!-- 饼图 -->
    <!-- <p>{{title}}</p> -->
    <div class="map" ref="map"></div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'

  @Component({
    components: {}
  })
  export default class configFauge extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的title
    @Prop({}) data!:any // 接收父组件传过来的数据
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''

    chartData:Array<any> = [
      { 'type': 'line', 'name': '语陪', 'data': [120, 132, 101, 334, 90, 230, 1210] },
      { 'type': 'line', 'name': '活动', 'data': [220, 182, 191, 234, 290, 330, 310] },
      { 'type': 'line', 'name': '咨询', 'data': [150, 232, 601, 854, 190, 330, 410] },
      { 'type': 'line', 'name': '定金', 'data': [320, 332, 301, 334, 390, 930, 320] },
      { 'type': 'line', 'name': '订单', 'data': [820, 932, 901, 934, 1290, 1330, 1320] },
      { 'type': 'line', 'name': '垃圾', 'data': [320, 582, 991, 434, 590, 630, 710] },
      { 'type': 'line', 'name': '无聊', 'data': [420, 382, 291, 534, 990, 730, 810] }
    ]

    seriesData:Array<any> = []
    legendData:Array<string> = []

    @Watch('styles') patintingWatch (newVal:any, oldVal:any) {
      console.log(newVal)
      if (newVal && JSON.stringify(newVal) !== '{}') {
        console.log(1)
        this.$nextTick(() => {
          console.log(this.myChart)
          this.myChart.resize()
        })
      } else {
        this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
        console.log(this.myChart)
        this.myChart.clear()
        this.myChart.setOption(this.option, true)
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
      this.chartData.sort((a:any, b:any) => {
        return a.value - b.value
      })
      this.chartData.map((v:any, i:number) => {
        if (v.value > 0) {
          this.seriesData.push({ name: v.name, value: v.value })
          this.legendData.push(v.name)
        }
      })
      this.$nextTick(() => {
        this.initEchartsFun(this.seriesData, this.legendData)
      })
    }

    initEchartsFun (series:Array<any>, legendData:Array<string>) {
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        /* toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        }, */
        title: { // 标题样式
          show: true,
          fontSize: 12,
          // fontWeight: 'bolder',
          fontStyle: 'italic',
          color: '#d67e7e'
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            axisLine: { // 坐标轴线
              lineStyle: { // 控制样式
                width: 10
              }
            },
            axisTick: { // 分隔线小标记长度
              length: 10,
              lineStyle: {
                coloe: 'auto'
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                color: 'auto'
              }
            },
            detail: { formatter: '{value}%', fontSize: 14 },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      }
      this.myChart.setOption(this.option, true)
    }
  }
</script>

<style lang='less' scoped>
.config {
  height: 100%;
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    color: #afbdd1;
  }
  .map {
    height: 100%;
    width: 100%;
  }
}
</style>
