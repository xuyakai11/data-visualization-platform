<template>
  <div class="pcBar"> <!-- 柱状图 -->
    <p class="title">{{title}}</p>
    <div class="map" ref="map" style="height: 2.2rem;width: 3.1rem;">
      <!-- <ve-pie :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-pie> -->
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import echarts from 'echarts'
  require('echarts/lib/chart/pie')

  @Component({
    components: {}
  })
  export default class pcBar extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的数据
    chartData:any = {
      columns: ['name', 'value'],
      rows: [
        { 'name': '北京', 'value': 510 },
        { 'name': '浙江', 'value': 498 },
        { 'name': '湖南', 'value': 210 },
        { 'name': '江西', 'value': 410 },
        { 'name': '湖北', 'value': 498 },
        { 'name': '江苏', 'value': 550 },
        { 'name': '海南', 'value': 498 }
      ]
    }
    mounted () {
      setTimeout(() => {
        this.initEchartsFun()
      }, 1000)
      /* window.onresize = () => {//  根据窗口大小调整曲线大小
		    const myChart = echarts.init(this.$refs.map as HTMLDivElement)
		    myChart.resize();
		  } */
    }
    initEchartsFun () {
      const myChart = echarts.init(this.$refs.map as HTMLDivElement)
      myChart.setOption({
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c}',
          position: 'left' // ['50%', '50%']
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
          },
          axisLine: { // x轴刻度线
            show: true
          },
          splitLine: { // 中间刻度线
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 10
            }
          }
        },
        yAxis: {
          type: 'category',
          splitLine: { show: false }, // 刻度线
          axisTick: { // 分隔y轴下方小刻度线
            show: false
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 10
            }
          },
          data: ['北京', '浙江', '湖南', '江西', '湖北', '江苏', '海南']
        },
        series: {
          name: this.title,
          type: 'bar',
          itemStyle: {
            normal: {
              color: function (params:any) { // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                var colorList = ['#64B9FC', '#81C784', '#E57373', '#369FF1', '#f1963b', '#ff4715', '#5072b8']
                return colorList[params.dataIndex]
              }
            }
          },
          data: [182, 234, 290, 104, 131, 630, 550].sort()
        }
      })
    }
  }
</script>

<style lang='less' scoped>
.pcBar {
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
