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
  export default class configyBar extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的title
    @Prop({}) data!:any // 接收父组件传过来的数据
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''

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
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'axis', // 配置鼠标悬浮阴影
          formatter: '{b} : {c}',
          axisPointer: { // 配置鼠标悬浮阴影
            type: 'shadow'
          },
          position: 'right' // ['50%', '50%']
        },
        calculable: true,
        grid: {
          top: 10,
          bottom: 20,
          left: 40,
          right: 20
        },
        xAxis: {
          type: 'value',
          boundaryGap: false, // 从0刻度开始
          axisTick: { // 分隔x轴下方小刻度线
            show: false
            // alignWithLabel: true
          },
          /* axisLine: { // x轴刻度线
            show: true
          },
          splitLine: { // 中间刻度线
            show: false
          }, */
          axisLabel: {
            textStyle: {
              color: '#16325c',
              fontSize: 10
            }
          }
        },
        yAxis: {
          type: 'category',
          splitLine: { show: false }, // 刻度线
          axisTick: { // 分隔y轴下方小刻度线
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#16325c',
              fontSize: 10
            }
          },
          data: this.legendData // ['北京', '浙江', '湖南', '江西', '湖北', '江苏', '海南']
        },
        series: {
          name: this.title,
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            normal: {
              color: function (params:any) { // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                var colorList = ['#64B9FC', '#81C784', '#E57373', '#369FF1', '#f1963b', '#ff4715', '#5072b8']
                return colorList[params.dataIndex]
              }
            }
          },
          data: this.chartData // [182, 234, 290, 104, 131, 630, 550].sort()
        }
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
