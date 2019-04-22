<template>
  <div class="rank">
    <h4 class="title">{{title}}</h4>
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{index + 1}}</span>
        <span >{{item.name}}</span>
        <span >{{item.total}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class RankingList extends Vue {
    @Prop({}) title!:string // 接收父组件传过来的数据
    @Prop({}) list!:string // 接收父组件传过来的数据
  }
</script>

<style lang="less" scoped>
  .rank{
    padding: 0 24px 12px 12px;
    .title{
      color: #afbdd1;
    }
    .list{
      margin: 25px 0 0;
      padding: 0;
      list-style: none;
      li {
        margin-top: 16px;
        span {
          color: rgba(231, 230, 230, 0.65);
          font-size: 14px;
          line-height: 22px;
        }
        span:first-child {
          background-color:rgba(0,0,0,.65);
          border-radius: 20px;
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }
        span.active {
          background-color: #314659;
          color: #fff;
        }
        span:last-child {
          float: right;
        }
      }
    }
  }
</style>
