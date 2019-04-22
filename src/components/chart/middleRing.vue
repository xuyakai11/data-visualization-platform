<template>
  <div class="middleRing"> <!-- 柱状图 -->
    <p>{{title}}</p>
    <div class="map" >
      <ve-ring :data="chartData" height="100%" :extend="extend" :settings="chartSettings"></ve-ring>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class middleRing extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的数据
    // title:string = '月收入业务类型'
    chartData:any = {
      columns: ['date', 'value'],
      rows: [
        { 'date': '2018-05-22', 'value': 510 },
        { 'date': '2018-05-23', 'value': 498 },
        { 'date': '2018-05-24', 'value': 210 },
        { 'date': '2018-05-25', 'value': 410 },
        { 'date': '2018-05-26', 'value': 498 },
        { 'date': '2018-05-27', 'value': 550 },
        { 'date': '2018-05-28', 'value': 498 }
      ]
    }
    chartSettings:any = { // 堆叠面积配置
      offsetY: 124, // 纵向偏移量
    }
    extend:any = {
      series: {
        name: this.title + 'gg',
        // radius : [40, 110],
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          formatter: "{a} <br/> {b} : {c} ({d}%)",
          position:  'right'// ['50%', '50%']
        },
        label: {
          normal: { // 是否显示指标线
            show: false,
            
            position: 'center' // 标签显示位置
          },
          emphasis: {
            show: true
          }
        },
      },
      legend: { show: false }, // 图例
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx:any) {
          return Math.random() * 200;
      }
    }
  }
</script>

<style lang='less' scoped>
.middleRing {
  height: 100%;
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    color: #afbdd1;
  }
  .map {
    height: calc(100% - 20px);
  }
}
</style>
