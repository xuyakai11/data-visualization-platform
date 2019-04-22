<template>
  <div class="middleChina"> <!-- 柱状图 -->
    <p>{{title}}</p>
    <div class="map" >
      <ve-map :data="chartData" height="100%" :settings="chartSettings" :extend="extend"></ve-map>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class middlePie extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的数据
    // title:string = '月收入业务类型'
    chartData:any = {
      columns: ['位置', '收入'],
      rows: [
        { '位置': '北京', '收入': 123 },
        { '位置': '四川', '收入': 50000 },
        { '位置': '上海', '收入': 12345 },
        { '位置': '浙江', '收入': 900 },
        { '位置': '广东', '收入': 5000 },
        { '位置': '河南', '收入': 400 },
        { '位置': '河北', '收入': 8989 },
        { '位置': '江西', '收入': 9999 },
      ]
    }
    chartSettings:any = {
      label: { // 图上文字设置
        normal: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          textStyle: {
            color: '#007bff'
          }
        }
      }
    }
    extend:any = {
      visualMap: { // 设置有值模块由高到底渐变色
        min: 0,
        max: 50000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true, //是否拖拽
        textStyle: {
          color: 'white'
        },
        inRange: { // 设置颜色
          color: ['rgba(63, 155, 255, .5)', 'rgba(63, 155, 255, 1)']
        },
      },
      /* toolbox: { // 设置刷新等操作模块
          show: true,
          orient : 'vertical',
          left: 'right',
          top: 'center',
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      }, */
      series: {
        roam: false, // 是否开启鼠标缩放
        // coordinateSystem: 'geo'
        itemStyle: { // 设置地图样式
          normal: {
            show: true,
            borderColor: '#80b3dc',
            areaColor: 'transparent',
          },
          emphasis: { // 鼠标hover样式
            borderColor: '#26a69a',
            areaColor: '#17a2b8'
          }
        }
      },
      legend: { show: false }, // 图例
    }
  }
</script>

<style lang='less' scoped>
.middleChina {
  height: 100%;
  width: 100%;
  padding: 10px;
  p {
    position: absolute;
    font-size: 24px;
    color: #afbdd1;
  }
  .map {
    height: 100%;
    /* height: calc(100% - 20px); */
  }
}
</style>
