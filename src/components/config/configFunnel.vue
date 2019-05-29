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
  export default class configFunnel extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的title
    @Prop({}) data!:any // 接收父组件传过来的数据
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''

    chartData:Array<any> = [
      { 'name': '语陪', 'value': 100 },
      { 'name': '活动', 'value': 200 },
      { 'name': '咨询', 'value': 300 },
      { 'name': '定金', 'value': 400 },
      { 'name': '订单', 'value': 500 },
      { 'name': '垃圾', 'value': 600 },
      { 'name': '无聊', 'value': 700 }
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
      let max:number = 0
      let min:number = 0 // 假设第一个为最大或者最小
      this.chartData.map((v:any, i:number) => {
        let cur:number = +v.value
        cur > max ? max = cur : null
        cur < min ? min = cur : null
      })
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        /* title: {
          text: '漏斗图',
          subtext: '纯属虚构'
        }, */
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        /* toolbox: {
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        }, */
        /* legend: {
          data: ['语陪', '活动', '咨询', '定金', '订单', '垃圾', '无聊']
        }, */
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 20,
            // x2: 80,
            bottom: 20,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: max,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending', // 排序方式
            gap: 2, // 图形间距
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: this.chartData
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
