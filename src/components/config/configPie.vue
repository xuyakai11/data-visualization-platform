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
  export default class configPie extends Vue {
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
      if (newVal && JSON.stringify(newVal) !== '{}') {
        this.$nextTick(() => {
          this.myChart.resize()
        })
      } else {
        this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
        this.myChart.clear()
        this.initEchartsFun(this.seriesData, this.legendData)
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
      this.chartData.map((v:any, i:number) => {
        if (v.value > 0) {
          this.seriesData.push({ name: v.name, value: v.value })
          this.legendData.push(v.name)
        }
      })
      this.$nextTick(() => {
        this.initEchartsFun(this.seriesData, this.legendData)
      })
      setTimeout(() => {
        this.myChart.resize()
      }, 1000)
    }

    initEchartsFun (series:Array<any>, legendData:Array<string>) {
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        title: {
          // x: 'center',
          left: '30%', // 位置
          text: 'yname',
          textStyle: {
            fontSize: '10',
            color: '#16325c'
          }
        },
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c} ({d}%)',
          position: 'right' // ['50%', '50%']
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'right',
          textStyle: {
            color: '#16325c',
            fontSize: 10
          },
          pageIconSize: 10, // 翻页按钮大小
          itemWidth: 10, // 图例颜色块设置
          itemHeight: 10,
          pageIconInactiveColor: '#afaeae', // 翻页按钮颜色配置 不可翻
          pageIconColor: '#00D3E3', // 翻页按钮颜色配置 可翻
          data: legendData
        },
        series: {
          name: 'title标题',
          type: 'pie',
          radius: ['50%', '80%'],
          // roseType: 'radius', // 'area' 切换模式半径模式or面积模式
          center: ['35%', '55%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '12',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#64B9FC', '#81C784', '#E57373', '#369FF1', '#f1963b', '#ff4715', '#5072b8'],
          data: series
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
