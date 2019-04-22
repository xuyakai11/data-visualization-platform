<template>
  <div class="miniHistogram"> <!-- 柱状图 -->
    <ve-histogram :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-histogram>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class miniHistogram extends Vue {
    chartData:any = {
      columns: ['日期', '下单用户'],
      rows: [
        { '日期': '2018-05-15', '下单用户': 1810 },
        { '日期': '2018-05-16', '下单用户': 900 },
        { '日期': '2018-05-17', '下单用户': 2910 },
        { '日期': '2018-05-18', '下单用户': 1200 },
        { '日期': '2018-05-19', '下单用户': 4398 },
        { '日期': '2018-05-20', '下单用户': 9810 },
        { '日期': '2018-05-21', '下单用户': 4398 },
        { '日期': '2018-05-22', '下单用户': 9810 },
        { '日期': '2018-05-23', '下单用户': 4398 },
        { '日期': '2018-05-24', '下单用户': 2910 },
        { '日期': '2018-05-25', '下单用户': 9810 },
        { '日期': '2018-05-26', '下单用户': 4398 },
        { '日期': '2018-05-27', '下单用户': 1810 },
        { '日期': '2018-05-28', '下单用户': 4398 }
      ]
    }
    chartSettings:any = { // 堆叠面积配置
      stack: { '日期': ['下单用户'] },
      area: true
    }
    extend:any = {
      series: {},
      tooltip : {
        trigger: 'axis',
        axisPointer : { // 坐标轴指示器，坐标轴触发有效
          type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        show: false,  
        boundaryGap: false
      },
      yAxis: { 
        show: false,
        boundaryGap: false
      },
      itemStyle: { // 折线线配置
        color: '#1890ff'
      },
      legend: { data:[] }, // 图例
      grid: {
        top: 0,
        bottom: -20,
        left: -35,
        right: 10,
        containLabel: true
        /* x: -55,
        y: 0,
        x2: 0,
        y2: -20 */
      }
    }
  }
</script>

<style lang='less' scoped>
.miniHistogram {
  height: 46px;
  width: 100%;
}
</style>
