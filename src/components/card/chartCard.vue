<template>
  <a-card :body-style="{padding: '20px 24px 8px'}" :bordered="false">
    <div class="chart-card-header">
      <div class="meta">
        <span class="chart-card-title">{{title}}</span>
        <span class="chart-card-action">
        <slot name="action"></slot>
      </span>
      </div>
      <div class="total"><span>{{total}}</span></div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot></slot>
      </div>
    </div>
    <div class="chart-card-footer">
      <slot name="footer"></slot>
    </div>
  </a-card>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'
  
 @Component
 export default class ChartCard extends Vue {
   @Prop() private title!: string
   @Prop() private total!: string
 }
</script>

<style scoped lang='less'>
  .ant-card {
    background: transparent!important;
    border: 1px solid rgb(88, 192, 196);
    color: #f8f9fa;
    .chart-card-header {
      position: relative;
      overflow: hidden;
      width: 100%;
      .meta {
        position: relative;
        overflow: hidden;
        width: 100%;
        color: #f8f9fa;
        /* color: rgba(0,0,0,.45); */
        font-size: 14px;
        line-height: 22px;
        .chart-card-action{
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          color: #f8f9fa;
        }
      }
      .total {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        /* color: #000; */
        color: #f8f9fa;
        margin-top: 4px;
        margin-bottom: 0;
        font-size: 30px;
        line-height: 38px;
        height: 38px;
      }
    }
    .chart-card-content{
      margin-bottom: 12px;
      position: relative;
      height: 46px;
      width: 100%;
      .content-fix{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        span.ant-progress-text {
          font-size: 90px;
          color: #f8f9fa!important;
        }
      }
    }
    .chart-card-footer {
      border-top: 1px solid #e8e8e8;
      padding-top: 9px;
      margin-top: 8px;
    }
  }
</style>
