<template>
  <div class="pcRing"> <!-- 圆环图 -->
    <p class="title">{{title}}</p>
    <div class="map" ref="map" style="height: 2.2rem;width: 3.1rem;">
      <!-- <ve-pie :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-pie> -->
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'
  require('echarts/lib/chart/pie')

  @Component({
    components: {}
  })
  export default class pcPie extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的title
    @Prop({}) data!:any // 接收父组件传过来的数据

    /* chartData:any = {
      columns: ['name', 'value'],
      rows: [
        { 'name': '2018-05-22', 'value': 510 },
        { 'name': '2018-05-23', 'value': 498 },
        { 'name': '2018-05-24', 'value': 210 },
        { 'name': '2018-05-25', 'value': 410 },
        { 'name': '2018-05-26', 'value': 498 },
        { 'name': '2018-05-27', 'value': 550 },
        { 'name': '2018-05-28', 'value': 498 }
      ]
    } */

    seriesData:Array<any> = []
    legendData:Array<string> = []
    @Watch('data', { deep: true, immediate: true }) dataWatch (newVal:Array<any>, oldVal:Array<any>) {
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
    }
    mounted () {
    }
    initEchartsFun (series:Array<any>, legendData:Array<string>) {
      const myChart = echarts.init(this.$refs.map as HTMLDivElement)
      myChart.clear()
      const option = {
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c} ({d}%)',
          position: 'left' // ['50%', '50%']
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'left',
          textStyle: {
            color: '#FFF',
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
          name: this.title,
          type: 'pie',
          radius: ['50%', '80%'],
          // roseType: 'radius', // 'area' 切换模式半径模式or面积模式
          center: ['65%', '45%'],
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
      myChart.setOption(option, true)
    }
  }
</script>

<style lang='less' scoped>
.pcRing {
  position: absolute;
  height: 2.7rem;
  width: 3.1rem;
  .title {
    height: .44rem;
    line-height: .44rem;
    padding-left: .2rem;
    font-size: .2rem;
    letter-spacing: 0;
    color: #00D3E3;
    background: rgba(0, 54, 115, .3);
  }
  .map {
    height: 2.2rem;
    width: 100%;
  }
}
</style>
