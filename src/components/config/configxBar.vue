<template>
  <div class="config"> <!-- 饼图 -->
    <!-- <p>{{title}}</p> -->
    <div class="map" ref="map"></div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'
  require('echarts/lib/chart/bar')

  @Component({
    components: {
      /* directive('resize', {
        bind(el, binding) {
          let width = '', height = '';
          function get() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
              binding.value({width, height});
            }
            width = style.width;
            height = style.height;
          }

          el.__vueReize__ = setInterval(get, 200);
        },
        unbind(el) {
          clearInterval(el.__vueReize__);
        }
      }) */
    }
  })
  export default class configxBar extends Vue {
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

    myChart:any = ''
    option:any = ''
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
    // 监听paintingReport 是因为如果其变化则显示验证公式按钮 deep: true, immediate: true
    @Watch('styles') patintingWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        this.$nextTick(() => {
          this.myChart.resize()
        })
      } else {
        this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
        this.myChart.clear()
        this.myChart.setOption(this.option, true)
      }
    }
   
    mounted () {
      /* this.chartData.sort((a:any, b:any) => {
        return a.value - b.value
      })
      this.chartData.map((v:any, i:number) => {
        if (v.value > 0) {
          this.seriesData.push({ name: v.name, value: v.value })
          this.legendData.push(v.name)
        }
      }) */
      // this.initEchartsFun(this.seriesData, this.legendData)
      console.log(this.styles)
      // console.log(document.getElementsByClassName('lpc-contentReport')[0].clientWidth)
      // this.parentWidth = document.getElementsByClassName('config')[0].clientWidth
      //   this.parentHeight = document.getElementsByClassName('config')[0].clientHeight
      //   console.log(this.parentHeight)
      //   console.log(this.parentWidth)
      //   this.$refs.map.style.height = this.parentHeight
      //   this.$refs.map.style.width = this.parentWidth
      
      this.$nextTick(() => {
        this.initEchartsFun()
      })
      // if (this.styles) {
      //   console.log('what fuck')
      //     this.initEchartsFun()
      //   this.$nextTick(() => {
      //     this.myChart.resize()
      //   })
      // } else {
      //   this.$nextTick(() => {
      //     this.initEchartsFun()
      //   })
      // }
    }

    initEchartsFun () { // series:Array<any>, legendData:Array<string>
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'axis',
          formatter: '{b} : {c}',
          position: 'right', // ['50%', '50%']
          axisPointer: {
            type: 'shadow'
          }
        },
        calculable: true,
        grid: {
          top: 10,
          bottom: 20,
          left: 40,
          right: 20
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, // 从0刻度开始
          axisTick: { // 分隔x轴下方小刻度线
            show: false,
            alignWithLabel: true
          },
          splitLine: { show: false }, // 刻度线
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#16325c',
              fontSize: 10
            }
          },
          data: this.legendData // ['北京', '浙江', '湖南', '江西', '湖北', '江苏', '海南']
        },
        yAxis: {
          type: 'value'
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
      // myChart.refresh()
      /* myChart.resize(); */
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
