<template>
  <div class="chart-trend">
    {{term}}
    <span>{{rate}}%</span>
    <span :class="['chart-trend-icon', trend]" style=""><a-icon :type="'caret-' + trend" /></span>
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class Trend extends Vue {
   @Prop() private term!: string
   @Prop() private target!: number
   @Prop() private isIncrease!: boolean
   @Prop() private value!: number
   @Prop() private percent!: any
   @Prop() private scale!: number
 
  trend:string = this.isIncrease ? 'up' : 'down'
  rate:string = this.percent

  created () {
    this.trend = this.caulateTrend()
    this.rate = this.caulateRate()
  }
    caulateRate () {
      console.log((this.percent === null ? Math.abs(this.value - this.target) * 100 / this.target : this.percent).toFixed(this.scale))
      return (this.percent === null ? Math.abs(this.value - this.target) * 100 / this.target : this.percent).toFixed(this.scale)
    }
    caulateTrend ():string {
      let isIncrease = this.isIncrease === null ? this.value >= this.target : this.isIncrease
      return isIncrease ? 'up' : 'down'
    }
  
}
</script>

<style lang="less" scoped>
  .chart-trend{
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    .chart-trend-icon{
      font-size: 12px;
      &.up{
        color: #f5222d;
      }
      &.down{
        color: #52c41a;
      }
    }
  }
</style>
