<template>
  <div id="areaBasic" style="width:700px;height: 500px">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

const echarts = require('echarts/lib/echarts') // 引入ECharts主模块
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

@Component
export default class AreaBasic extends Vue {
  @Prop()private datas!: any;

  rankList: Array<any> = [];

  created () {
    axios.get(this.datas.url, { params: this.datas.data }).then((r:any) => {
      r = r.data
      if (Object.prototype.toString.call(r).slice(8, -1) === 'Array') {
        console.log(r)
      }
    })
  }
  mounted () {
    this.drawChartAreaBasic()
  }
  drawChartAreaBasic () {
    const myChart = echarts.init(document.getElementById('areaBasic'))
    myChart.setOption({
      // tooltip: {
      //   show: false,
      //   trigger: 'axis'
      // },
      title: {
        left: 'left',
        text: '当日时点报名情况',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      calculable: true,
      grid: {
        x: 40,
        y: 60,
        x2: 30,
        y2: 50,
        borderWidth: 0
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#5b6678',
            width: 1
          }
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        },
        data: [1, 2, 3]
      }],
      yAxis: {
        type: 'value',
        name: '金额(元)',
        splitLine: { show: false },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        axisLine: {
          lineStyle: {
            color: '#5b6678',
            width: 1
          }
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        }
      },
      series: [
        {
          name: '',
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#2187be',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(2,161,222,.9)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              },
              borderColor: '#2187be',
              borderWidth: 6
            }
          },
          symbol: 'circle',
          z: 1,
          data: [1, 2, 4]
        }
      ]
    })
  }
}
</script>
