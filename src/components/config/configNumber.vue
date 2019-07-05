<template>
  <div class="config">
    <div class="map" ref="map">
      <count-to ref="totalIncomeMoney" v-if="JSON.stringify(chartData) !== '{}'" :separator="','" :decimals="+chartData.value | decimalsFilter" :suffix="preUnit" :autoplay="true" :startVal="0" :endVal="+chartData.value" :duration="500"></count-to>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import countTo from 'vue-count-to'

  @Component({
    components: { countTo },
    filters: { // 注册过滤器
      decimalsFilter (value:any):number { // 过滤保留几位小数
        if (value.toString().indexOf('.') !== -1) {
          return 1
        } else {
          return 0
        }
      }
    }
  })

  export default class configNumber extends Vue {
    @Prop({}) paramsData!:any
    @Prop({}) styles!:any

    seriesData:Array<any> = []
    legendData:Array<string> = []
    preUnit:string = '' // 单位
    chartData:any = {}
    myChart:any = ''
    option:any = ''
   /*  <a-select-option value="whole">全数字</a-select-option>
                  <a-select-option value="hundres">百</a-select-option>
                  <a-select-option value="thousands">数千</a-select-option>
                  <a-select-option value="ten_thousands">万</a-select-option>
                  <a-select-option value="millions">数百万</a-select-option>
                  <a-select-option value="billions">十亿</a-select-option> */
    preUnitData:Array<any> = [
      { key: 'whole', unit: ''},
      { key: 'hundres', unit: 'H'},
      { key: 'thousands', unit: 'K'},
      { key: 'millions', unit: 'M'},
      { key: 'billions', unit: 'B'}
    ]
    /* @Watch('styles') patintingWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        this.$nextTick(() => {
          // this.myChart.resize();
        })
      } else {
        this.$nextTick(() => {
          // this.myChart = echarts.init(this.$refs.map as HTMLDivElement)
          // this.myChart.clear()
          // this.myChart.setOption(this.option, true)
        })
      }
    } */
    @Watch('paramsData', { deep: true, immediate: true }) paramsDataWatch (newVal:any, oldVal:any) {
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
      this.chartData = {}
      let _this = this;
      (this as any).$post('/custom/boardManage/generateBoardData', params).then((res: any) => {
        if (res.state === 2000) {
          this.chartData = res.data
          if (JSON.stringify(this.chartData) !== '{}') {
            this.preUnitData.map((v:any, i:number) => {
            if (v.key === this.chartData.pre_unit) {
                this.preUnit = v.unit
              }
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
  .map {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    font-size: 50px;
    display: flex;
    /* position: relative; */
    span {
      /* position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      display: block;
      text-align: center; */
      color: #00716b;
      margin: auto;
    }
  }
}
</style>
