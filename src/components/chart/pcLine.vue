<template>
  <div class="pcLine"> <!-- 折线面积图 -->
    <p class="title">{{ title }}</p>
    <div class="map" ref="map" style="height: 2.2rem;width: 3.1rem;">
      <!-- <ve-line :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-line> -->
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  import echarts from 'echarts'
  require('echarts/lib/chart/line')

  @Component({
    components: {}
  })
  export default class pcLine extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的title
    @Prop({}) data!:any // 接收父组件传过来的数据
    @Prop({}) startColor!:string // 渐变颜色
    @Prop({}) endColor!:string // 渐变颜色
    myChart:any = ''
    /* chartData:any = {
      columns: ['weeknum', 'money'],
      rows: [
        { 'weeknum': '15', 'money': 1981 },
        { 'weeknum': '16', 'money': 900 },
        { 'weeknum': '17', 'money': 5291 },
        { 'weeknum': '18', 'money': 1200 },
        { 'weeknum': '19', 'money': 4398 },
        { 'weeknum': '20', 'money': 1981 }
      ]
    } */
    xData:Array<string> = []
    seriesData:Array<string> = []
    @Watch('data', { deep: true, immediate: true }) dataWatch (newVal:Array<any>, oldVal:Array<any>) {
      // if (this.myChart) {
      if (newVal !== oldVal && newVal.length) {
        this.xData = []
        this.seriesData = []
        newVal.map((v:any, i:number) => {
          this.xData.push(v.weeknum)
          this.seriesData.push(v.weekIncomeMoney)
        })
        this.initEchartsFun()
      } else {
        // this.initEchartsFun()
      }
      // }
    }

    mounted () {
      // setTimeout(() => {
        // this.xData = ['12', '13', '14', '18', '10']
        // this.initEchartsFun()
      // }, 1000)
      /* window.onresize = () => { //  根据窗口大小调整曲线大小
		    const myChart = echarts.init(this.$refs.map as HTMLDivElement)
		    myChart.resize();
		  } */
    }
    initEchartsFun () {
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.setOption({
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        calculable: true,
        grid: {
          top: 10,
          bottom: 20,
          left: 40,
          right: 10
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 从0刻度开始
          splitLIne: { show: false }, // 刻度线
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 10
            }
          },
          data: this.xData
        },
        yAxis: {
          type: 'value',
          // name: '单位：xxxx',
          splitLine: { show: false }, // 刻度线
          axisLine: { show: false },
          axisTick: { // 分隔x轴下方小刻度线
            show: false
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 10
            }
          }
        },
        series: {
          type: 'line',
          label: {
            normal: {
              color: this.startColor,
              show: true // 节点上是否显示数值
            }
          },
          symbol: 'circle', // 设置节点上的标记图形类型
          symbolSize: 4,
          showSymbol: false, // 默认为true，设值为false时，hover有效
          itemStyle: {
            normal: {
              show: true,
              color: this.startColor
            }
          },
          areaStyle: {
            normal: { // 渐变配置
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: this.startColor
                }, {
                  offset: 1, color: this.endColor
                }],
                global: false
              }
            }
          },
          data: this.seriesData
        }
      }, true)
    }
  }
</script>

<style lang='less' scoped>
.pcLine {
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
