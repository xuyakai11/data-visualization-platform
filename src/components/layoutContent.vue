<template>
  <div id="layoutContent">
    <div class="layOne" v-show="$store.state.layoutOne">
      <div class="oneLeft">
        <div class="top" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="middle" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="bottom" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
      <div class="oneCenter">
        <div class="oneCenter-top">
          <h3>朴新晟嘉窗口期</h3>
        </div>
        <div class="oneCenter-bottom" id="top" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
    </div>
    <div class="layTwo" v-show="$store.state.layoutTwo">
      <div class="twoLeft">
        <div class="top" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="middle" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="bottom" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
      <div class="twoRight">
        <div class="twoRight-top">
           <h3>朴新晟嘉窗口期</h3>
        </div>
        <div class="twoRight-bottom" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
    </div>
    <div class="layThree" v-show="$store.state.layoutThree">
      <div class="threeLeft">
        <div class="top" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="middle" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="bottom" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
      <div class="threeCenter">
        <div class="threeCenter-top" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="threeCenter-middle" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="threeCenter-bottom" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
      <div class="threeRight">
        <div class="top" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="middle" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
        <div class="bottom" @drop="drop($event)" @dragover="allowDrop($event)">

        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'
 import * as echarts from 'echarts'
 require('echarts/lib/chart/line')

 require('echarts/lib/component/tooltip')
 require('echarts/lib/component/title')

 @Component({
   props: {
     mapFlag: Number
   }
 })
 export default class layout extends Vue {
   option: Object = {}

 /*   option: Object = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['蒸发量','降水量','平均温度']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} °C'
            }
        }
    ],
    series: [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
}; */

  created () {
    this.$axios.get('/api/option').then((response: any) => {
      response = response.data
      if (response.code == 0) {
        this.option = response.data // 获取到数据
      }
    })
  }

  drop (e: any): void { // 当放置被拖数据时
    e.preventDefault();
    let myChart = echarts.init(e.target)
    myChart.setOption(this.option[this.mapFlag], true);
  }
  allowDrop (e:any): void { // 规定在何处放置被拖动的数据
    e.preventDefault()
  }

  mounted () {
    
  }
    
 }
</script>

<style lang='scss' scoped>
  #layoutContent {
    margin-top: 68px;
    background: url('../assets/img/body-bg.jpg') 0 0 no-repeat;
    width: 100%;
    height: 100%;
    .top,.middle,.bottom {
      overflow: hidden;
      height: 294px;
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      margin-bottom: 8px;
      margin-top: 8px;
      text-align: center;
      border-style: solid;
      border-width: 14px 20px;
      border-image-source: url('../assets/img/rank-border.png');
      border-image-slice: 14 20;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .layOne {
      display: flex;
      .oneLeft {
        flex: 1;
      }
      .oneCenter {
        flex: 3;
        .oneCenter-top {
          overflow: hidden;
          height: 294px;
          width: 100%;
          margin: 8px 0;
          padding: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid red;
          border-radius: 5px;
          h3 {
            font-size: 44px;
            font-weight: normal;
            color: rgb(248, 188, 56);
          }
        }
        .oneCenter-bottom {
          overflow: hidden;
          height: 596px;
          width: 100%;
          padding-top: 10px;
          padding-bottom: 10px;
          margin-bottom: 8px;
          margin-top: 8px;
          text-align: center;
          border-style: solid;
          border-width: 14px 20px;
          border-image-source: url('../assets/img/rank-border.png');
          border-image-slice: 14 20;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .layTwo {
      display: flex;
      .twoLeft {
        flex: 1;
      }
      .twoRight {
        flex: 3;
        .twoRight-top {
          overflow: hidden;
          height: 294px;
          width: 100%;
          margin: 13px 0;
          padding: 10px;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid red;
          border-radius: 5px;
          h3 {
            font-size: 44px;
            font-weight: normal;
            color: rgb(248, 188, 56);
          }
        }
      }
    }
    .layThree {
      display: flex;
      .threeLeft, .threeRight {
        flex: 1;
      }
      .threeCenter {
        flex: 2;
      }
    }
  }
</style>
