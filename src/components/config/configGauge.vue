<template>
  <div class="config">
    <div class="map" ref="map">暂无数据</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'

  @Component({
    components: {}
  })
  export default class configFauge extends Vue {
    @Prop({}) paramsData!:any
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''
    preUnit:string = ''
    chartData:Array<any> = []
    seriesData:Array<any> = []
    legendData:Array<string> = []

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
        console.log(newVal)
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
      /* this.chartData.sort((a:any, b:any) => {
        return a.value - b.value
      })
      this.chartData.map((v:any, i:number) => {
        if (v.value > 0) {
          this.seriesData.push({ name: v.name, value: v.value })
          this.legendData.push(v.name)
        }
      }) */
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
      // this.$nextTick(() => {
      //   this.initEchartsFun(this.seriesData, this.legendData)
      // })
    }

    initEchartsFun (seriesData:Array<any>) {
      console.log(seriesData) //[{value: 50, name: '完成率'}]
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        /* toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        }, */
        title: { // 标题样式
          show: true,
          fontSize: 10,
          // fontWeight: 'bolder',
          fontStyle: 'italic',
          color: '#d67e7e'
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            axisLine: { // 坐标轴线
              lineStyle: { // 控制样式
                width: 10
              }
            },
            axisTick: { // 分隔线小标记长度
              length: 10,
              lineStyle: {
                coloe: 'auto'
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                color: 'auto'
              }
            },
            detail: { formatter: '{value}%', fontSize: 14 },
            data: seriesData
          }
        ]
      }
      this.myChart.setOption(this.option, true)
    }
    initGetChartsDataFun (params:any):void { // { 'report_id': 123, 'type': 'xBar', 'group_id': '9,12', 'field_id': '5', 'pre_unit': 'whole' }?report_id=130&type=xBar&group_id=21,22&field_id=30&pre_unit=whole
      let _this = this;
      (this as any).$post('/custom/boardManage/generateBoardData', params).then((res: any) => {
        if (res.state === 2000) {
          this.chartData = res.data
          let arr:Array<any> = []
          arr.push(res.data)
          if (arr.length) {
            this.seriesData = arr
            _this.$nextTick(() => {
              _this.initEchartsFun(this.seriesData)
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
