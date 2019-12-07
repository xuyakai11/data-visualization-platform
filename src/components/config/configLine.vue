<template>
  <div class="config"> <!-- 折线图 -->
    <div class="map" ref="map">暂无数据</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'
  require('echarts/lib/chart/line')

  @Component({
    components: {}
  })
  export default class configLine extends Vue {
    @Prop({}) paramsData!:any
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''
    chartData:Array<any> = [
      /* { 'type': 'line', 'name': '语陪', 'data': [120, 132, 101, 334, 90, 230, 1210] },
      { 'type': 'line', 'name': '活动', 'data': [220, 182, 191, 234, 290, 330, 310] },
      { 'type': 'line', 'name': '咨询', 'data': [150, 232, 601, 854, 190, 330, 410] },
      { 'type': 'line', 'name': '定金', 'data': [320, 332, 301, 334, 390, 930, 320] },
      { 'type': 'line', 'name': '订单', 'data': [820, 932, 901, 934, 1290, 1330, 1320] },
      { 'type': 'line', 'name': '垃圾', 'data': [320, 582, 991, 434, 590, 630, 710] },
      { 'type': 'line', 'name': '无聊', 'data': [420, 382, 291, 534, 990, 730, 810] } */
    ]

    seriesData:Array<any> = []
    legendData:Array<string> = []
    preUnit:string = '' // 单位
    dataZoom:Array<any> = []
    group_label:string = ''
    field_label:string = ''
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
    @Watch('paramsData') paramsDataWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        let params:any = {
          'report_id': newVal.selected_rows.report_id,
          'type': newVal.type,
          'group_id': newVal.config_details.group_ids,
          'field_id': newVal.config_details.field_ids,
          'pre_unit': newVal.pre_unit.key
        }
        this.group_label = this.paramsData.group_label
        this.field_label = this.paramsData.field_label // 赋值x轴y轴标识
        // this.preUnit = newVal.pre_unit.label // 赋值单位文字
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
        this.group_label = this.paramsData.group_label
        this.field_label = this.paramsData.field_label // 赋值x轴y轴标识
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
            this.legendData = []
            this.seriesData = []
            if (res.data.legendData && res.data.seriesData) {
              this.legendData = res.data.legendData
              this.seriesData = res.data.seriesData
              this.seriesData.map((v:any, i:number) => {
                v.type = 'line'
                v.stack = '总量'
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
              let danLineArr:Array<number> = []
              this.chartData.map((v:any, i:number) => {
                // if (v.value > 0) {
                  danLineArr.push(v.value)
                  // this.seriesData.push({ type: 'line', stack: '总量', name: v.name, data: v.value })
                  this.legendData.push(v.name)
                // }
              })
              this.dataZoom = []
              this.seriesData = [{ type: 'line', data: danLineArr }]
            }
            setTimeout(() => {
              _this.initEchartsFun(this.legendData, this.seriesData)
            }, 500)
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
    initEchartsFun (legendData:Array<string>, seriesData:Array<any>) {
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        title: {
          // text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis',
          position: function (point:Array<any>, params:any, dom:HTMLElement, rect:any, size:any) {
            // 固定在顶部
            return [point[0]-20, '1%'];
          }
        },
        /* legend: {
          data: legendData // ['语陪', '活动', '咨询', '定金', '订单', '垃圾', '无聊']
        }, */
        grid: {
          /* left: '3%',
          right: '4%',
          bottom: '3%', */
          top: 10,
          bottom: 38,
          left: 50,
          right: 20
        },
        containLabel: true,
        toolbox: {
          // feature: { 配置下载按钮
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          name: this.group_label,
          type: 'category',
          nameGap: 25, // 距离坐标轴位置
          nameLocation: 'middle',
          nameTextStyle: {
            fontSize: '10',
            color: '#16325c'
          },
          boundaryGap: false, // 配置从间隔是否中间开始，坐标轴两边留白策略
          axisTick: { // 分隔x轴下方小刻度线
            show: false
          },
          data: legendData // ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          name: this.field_label,
          nameGap: 25,
          type: 'value',
          axisTick: { // 分隔x轴下方小刻度线
            show: false
          }
        },
        dataZoom: this.dataZoom,
        series: seriesData // seriesData
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
