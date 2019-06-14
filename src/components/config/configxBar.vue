<template>
  <div class="config" > <!-- xBar图 -->
    <div class="map" ref="map">暂无数据</div>
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
    @Prop({}) styles!:any
    @Prop({}) paramsData!:any

    /* chartData:Array<any> = [
      { 'name': '语陪', 'value': 510 },
      { 'name': '活动', 'value': 489 },
      { 'name': '咨询', 'value': 343 },
      { 'name': '定金', 'value': 234 },
      { 'name': '订单', 'value': 566 }
    ] */

    seriesData:Array<any> = []
    legendData:Array<string> = []
    seriesLabel:any = {
      normal: {
        show: true,
        textBorderColor: '#333',
        textBorderWidth: 2
      }
    }
    myChart:any = ''
    option:any = ''
    preUnit:string = '' // 单位
    chartData:Array<any> = []
    dataZoom:Array<any> = [] // 滚动轴
    // 监听styles 是因为如果其变化则显示验证公式按钮 deep: true, immediate: true
    @Watch('styles') patintingWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        this.$nextTick(() => {
          this.myChart.resize()
        })
      } else {
        this.$nextTick(() => {
          this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
          this.myChart.clear()
          this.myChart.setOption(this.option, true)
        })
      }
    }
    @Watch('paramsData') paramsDataWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        let params:any = {
          'report_id': newVal.selected_rows.report_id,
          'type': newVal.type,
          'group_id': newVal.config_details.group_ids,
          'field_id': newVal.config_details.field_ids,
          'pre_unit': newVal.pre_unit.key
        }
        this.preUnit = newVal.pre_unit.label // 赋值单位文字
        this.initGetChartsDataFun(params)
      }
    }
    mounted () {
      if (JSON.stringify(this.paramsData) !== '{}') {
        let params:any = {
          'report_id': this.paramsData.selected_rows.report_id,
          'type': this.paramsData.type,
          'group_id': this.paramsData.config_details.group_ids,
          'field_id': this.paramsData.config_details.field_ids,
          'pre_unit': this.paramsData.pre_unit.key
        }
        this.preUnit = this.paramsData.pre_unit.label // 赋值单位文字
        this.initGetChartsDataFun(params)
      }
    }
    initGetChartsDataFun (params:any):void { // { 'report_id': 123, 'type': 'xBar', 'group_id': '9,12', 'field_id': '5', 'pre_unit': 'whole' }?report_id=130&type=xBar&group_id=21,22&field_id=30&pre_unit=whole
      let _this = this;
      (this as any).$post('/custom/boardManage/generateBoardData', params).then((res: any) => {
        if (res.state === 2000) {
          this.chartData = res.data
          if (res.data.length || JSON.stringify(res.data) !== '{}') {
            if (res.data.legendData && res.data.seriesData) {
              this.legendData = res.data.legendData
              this.seriesData = res.data.seriesData
              this.seriesData.map((v:any, i:number) => {
                v.type = 'bar'
              })
              this.dataZoom = [
                {
                  show: true,
                  start: 0,
                  end: 20,
                  height: 20
                },
                /* {
                  type: 'inside',
                  start: 94,
                  end: 100
                }, */
                {
                  show: true,
                  yAxisIndex: 0,
                  filterMode: 'empty',
                  width: 10,
                  height: '80%',
                  showDataShadow: false,
                  right: '0%'
                }
              ]
            } else {
              this.chartData.sort((a:any, b:any) => {
                return a.value - b.value
              })
              this.chartData.map((v:any, i:number) => {
                if (v.value > 0) {
                  // this.seriesData.push({ name: v.name, value: v.value })
                  this.legendData.push(v.name)
                }
              }) 
              this.seriesData = [{
                type: 'bar',
                barWidth: '60%',
                barCategoryGap: 5,
                itemStyle: {
                  normal: {
                    color: function (params:any) { // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      var colorList = ['#64B9FC', '#81C784', '#E57373', '#369FF1', '#f1963b', '#ff4715', '#5072b8']
                      return colorList[params.dataIndex]
                    }
                  }
                },
                data: this.chartData
              }]
              this.dataZoom = []
            }
            _this.$nextTick(() => {
              _this.initEchartsFun(this.legendData, this.seriesData)
            })
          }
        } else {
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3) // 弹出错误message
        }
      })
    }

    initEchartsFun (legendData:Array<string>, seriesData:Array<any>) { // series:Array<any>, legendData:Array<string>
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      /* this.myChart.resize() */
      this.option = {
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'axis',
          // formatter: '{b} : {c}',
          position: 'right', // ['50%', '50%']
          axisPointer: {
            type: 'shadow'
          }
        },
        calculable: true,
        grid: {
          top: 10,
          bottom: 38,
          left: 50,
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
          // name: '人均收入123',
          nameGap: 25, // 距离坐标轴位置
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: '10',
            color: '#16325c',
          },
          data: legendData // ['北京', '浙江', '湖南', '江西', '湖北', '江苏', '海南']
        },
        yAxis: {
          type: 'value',
          // name: '人均收入',
          nameGap: 39,
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: '10',
            color: '#16325c',
          }
        },
        dataZoom: this.dataZoom,
        series: seriesData
        /* series: {
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
          data: this.seriesData // [182, 234, 290, 104, 131, 630, 550].sort()
        } */
      }
      this.myChart.setOption(this.option, true)
    } 
  }
</script>

<style lang='less' scoped>
.config {
  /* width: 1049px;
  height: 350px-30px-45px; */
  width: 100%;
  height: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    color: #afbdd1;
  }
  .map {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  /*   height: 239px;
    width: 466px; */
  }
  .errorText {
    /* visibility: hidden; */
  }
}
</style>
