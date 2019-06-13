<template>
  <div class="config"> <!-- 饼图 -->
    <!-- <p>{{title}}</p> -->
    <div class="map" ref="map">暂无数据</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'

  @Component({
    components: {}
  })
  export default class configScatter extends Vue {
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
        title: {
          // text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis',
          position: 'right'
        },
        legend: {
          data: ['语陪', '活动', '咨询', '定金', '订单', '垃圾', '无聊']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          // feature: { 配置下载按钮
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 配置从间隔是否中间开始，坐标轴两边留白策略
          axisTick: { // 分隔x轴下方小刻度线
            show: false
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisTick: { // 分隔x轴下方小刻度线
            show: false
          }
        },
        series: this.chartData
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
