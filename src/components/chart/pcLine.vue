<template>
  <div class="pcLine"> <!-- 折线面积图 -->
    <p class="title">{{ title }}</p>
    <div class="map" ref="map" style="height: 2.2rem;width: 3.1rem;">
      <!-- <ve-line :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-line> -->
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  import echarts from 'echarts'
  require('echarts/lib/chart/line')

  @Component({
    components: {}
  })
  export default class pcLine extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的数据
    @Prop({}) startColor!:string // 渐变颜色
    @Prop({}) endColor!:string // 渐变颜色

    chartData:any = {
      columns: ['time', '收入'],
      rows: [
        { 'time': '15', '收入': 1981 },
        { 'time': '16', '收入': 900 },
        { 'time': '17', '收入': 5291 },
        { 'time': '18', '收入': 1200 },
        { 'time': '19', '收入': 4398 },
        { 'time': '20', '收入': 1981 }
      ]
    }
    mounted () {
      setTimeout(() => {
        this.initEchartsFun()
      }, 1000)
      /* window.onresize = () => { //  根据窗口大小调整曲线大小
		    const myChart = echarts.init(this.$refs.map as HTMLDivElement)
		    myChart.resize();
		  } */
    }
    initEchartsFun () {
      const myChart = echarts.init(this.$refs.map as HTMLDivElement)
      myChart.setOption({
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
          data: ['15', '16', '17', '18', '19', '20']
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
          data: ['1981', '900', '5291', '1200', '1981', '2423']
        }
      })
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
