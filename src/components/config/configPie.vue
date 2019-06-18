<template>
  <div class="config"> <!-- 饼图 -->
    <!-- <p>{{title}}</p> -->
    <div class="map" ref="map">暂无数据</div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'

  @Component({
    components: {}
  })
  export default class configPie extends Vue {
    @Prop({}) paramsData!:any
    @Prop({}) styles!:any
    myChart:any = ''
    option:any = ''
    preUnit:string = '' // 单位

    chartData:Array<any> = [
      /* { 'name': '语陪', 'value': 510 },
      { 'name': '活动', 'value': 498 },
      { 'name': '咨询', 'value': 210 },
      { 'name': '定金', 'value': 410 },
      { 'name': '订单', 'value': 498 },
      { 'name': '垃圾', 'value': 550 },
      { 'name': '无聊', 'value': 498 } */
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
        this.initEchartsFun(this.seriesData, this.legendData)
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
      this.chartData.map((v:any, i:number) => {
        if (v.value > 0) {
          this.seriesData.push({ name: v.name, value: v.value })
          this.legendData.push(v.name)
        }
      })
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
    initEchartsFun (legendData:Array<string>, seriesData:Array<any>) {
      this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
      this.myChart.clear()
      this.option = {
        title: {
          // x: 'center',
          left: '30%', // 位置
          // text: 'yname',
          textStyle: {
            fontSize: '10',
            color: '#16325c'
          }
        },
        tooltip: { // 鼠标悬浮时，提示tooltip位置
          trigger: 'item',
          formatter: '{a} <br/> {b} : {c} ({d}%)',
          position: 'right' // ['50%', '50%']
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'right',
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
        /* legend: {
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
        }, */
        series: {
          name: 'title标题',
          type: 'pie',
          radius: ['50%', '80%'],
          // roseType: 'radius', // 'area' 切换模式半径模式or面积模式
          center: ['35%', '55%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '12',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#64B9FC', '#81C784', '#E57373', '#369FF1', '#f1963b', '#ff4715', '#5072b8'],
          data: seriesData
        }
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
