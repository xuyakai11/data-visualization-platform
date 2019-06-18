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
  export default class configFunnel extends Vue {
    @Prop({}) paramsData!:any
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''
    preUnit:string = '' // 单位

    chartData:Array<any> = [
      /* { 'name': '语陪', 'value': 150 },
      { 'name': '活动', 'value': 200 },
      { 'name': '咨询', 'value': 300 },
      { 'name': '定金', 'value': 400 },
      { 'name': '订单', 'value': 500 },
      { 'name': '垃圾', 'value': 600 },
      { 'name': '无聊', 'value': 700 } */
    ]

    seriesData:Array<any> = []
    legendData:Array<string> = []
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
        this.group_label = this.paramsData.group_label
        this.field_label = this.paramsData.field_label // 赋值x轴y轴标识
        this.preUnit = this.paramsData.pre_unit.label // 赋值单位文字
        this.initGetChartsDataFun(params)
      }
      // this.$nextTick(() => {
      //   this.initEchartsFun(this.seriesData, this.legendData)
      // })
    }

    initEchartsFun (legendData:Array<string>, seriesData:Array<any>) {
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
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 'left',
          bottom: 'bottom',
          textStyle: {
            color: '#16325c',
            fontSize: 10
          },
          pageIconSize: 10, // 翻页按钮大小
          itemWidth: 10, // 图例颜色块设置
          itemHeight: 10,
          pageIconInactiveColor: '#afaeae', // 翻页按钮颜色配置 不可翻
          pageIconColor: '#00D3E3', // 翻页按钮颜色配置 可翻
          data: legendData
        },
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            // right: '10%',
            top: 20,
            // x2: 80,
            bottom: 20,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: max,
            minSize: '0%',
            maxSize: '100%',
            // sort: 'descending', // 排序方式
            gap: 2, // 图形间距
            label: {
              show: false,
              position: 'inside',
              fontSize: '10'
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
            data: seriesData // this.chartData
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
          this.legendData = []
          this.seriesData = []
          if (res.data.length) {
            this.chartData.map((v:any, i:number) => {
              if (v.value > 0) {
                this.seriesData.push({ name: v.name, value: v.value })
                this.legendData.push(v.name)
              }
            }) 
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
