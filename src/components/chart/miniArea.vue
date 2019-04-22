<template>
  <div class="miniArea"> <!-- 折线面积图 -->
    <ve-line :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-line>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class miniArea extends Vue {
    chartData:any = {
      columns: ['日期', '下单用户'],
      rows: [
        { '日期': '2018-05-15', '下单用户': 19810 },
        { '日期': '2018-05-16', '下单用户': 900 },
        { '日期': '2018-05-17', '下单用户': 52910 },
        { '日期': '2018-05-18', '下单用户': 1200 },
        { '日期': '2018-05-19', '下单用户': 4398 },
        { '日期': '2018-05-20', '下单用户': 19810 },
        { '日期': '2018-05-21', '下单用户': 4398 },
        { '日期': '2018-05-22', '下单用户': 19810 },
        { '日期': '2018-05-23', '下单用户': 4398 },
        { '日期': '2018-05-24', '下单用户': 52910 },
        { '日期': '2018-05-25', '下单用户': 19810 },
        { '日期': '2018-05-26', '下单用户': 4398 },
        { '日期': '2018-05-27', '下单用户': 19810 },
        { '日期': '2018-05-28', '下单用户': 4398 },
      ]
    }
    chartSettings:any = { // 堆叠面积配置
      stack: { '日期': ['下单用户'] },
      area: true
    }
    /* chartEvents:any = {
        click: (e:any) => {
          self.name = e.name
          console.log(e)
        }
      } */
    extend:any = {
      series: {
        label: {
          normal: {
            show: false // 节点上是否显示数值
          }
        },
        symbol: 'circle', // 设置节点上的标记图形类型
        showSymbol: false // 默认为true，设值为false时，hover有效
      },
      xAxis: {
        show: false,  
        boundaryGap: false
      },
      yAxis: { 
        show: false,
        boundaryGap: false
      },
      lineStyle: { // 折线线配置
        color: '#1890ff'
      },
      areaStyle: { // 面积图配置
        color: '#1890ff'
      },
      legend: { data:[] }, // 图例
      grid: {
        top: 0,
        bottom: -20,
        left: -55,
        right: 0
        /* x: -55,
        y: 0,
        x2: 0,
        y2: -20 */
      }
    }
  }
</script>

<style lang='less' scoped>
.miniArea {
  height: 46px;
  width: 100%;
}
</style>
