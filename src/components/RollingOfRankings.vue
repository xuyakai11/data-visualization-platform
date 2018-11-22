<template>
  <div class="rank-wrap">
    <h3>{{datas.title}}</h3>
    <div class="list-title">
      <div class="circle"></div>
      <div v-for="item in datas.field" class="ellipsis" :key="item">{{item}}</div>
    </div>
    <div class="roll-wrap">
      <div v-for="(v,i) in rankList" class="list" :key="i*2">
        <div class="circle" :class="circleColor[i>2 ? 'other' : i]">{{i+1}}</div>
        <div v-for="item in datas.field" class="ellipsis" :key="item">{{v[item]}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class RollingOfRankings extends Vue {
  @Prop()private datas!: any;

  rankList: Array<any> = [];
  circleColor:any = {
    0: 'bg-orange',
    1: 'bg-light-orange',
    2: 'bg-yellow',
    other: 'bg-cyan'
  }
  created () {
    axios.get(this.datas.url, { params: this.datas.data }).then((r:any) => {
      r = r.data
      if (Object.prototype.toString.call(r).slice(8, -1) === 'Array') {
        this.rankList = r
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .rank-wrap {
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    width: 100%;
    height: 294px;
    text-align: center;
    color:#fff;
    border-style: solid;
    border-width: 14px 20px;
    border-image-source: url('../assets/img/rank-border.png');
    border-image-slice: 14 20;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rank-wrap h3 {
    font-size: 24px;
    line-height: 1.5;
    text-align: left;
    font-weight: normal;
    color: rgb(248, 188, 56);
  }
  .list-title,.list{
    overflow: hidden;
    display: flex;
    align-items: center;
    &>div{
      flex-grow: 1;
      font-size: 16px;
      line-height: 35px;
      text-align: left;
    }
    .circle{
      flex-basis: 20px;
      flex-grow: 0;
      margin-right: 10px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      border-radius: 50%;
    }
  }
  .list-title .circle{
    opacity: 0;
  }
  .bg-orange{
    background-color: #ff6029;
  }
  .bg-light-orange{
    background-color: #ff872a;
  }
  .bg-yellow {
    background-color: #f0ab38;
  }
  .bg-cyan {
    background-color: rgb(68, 211, 228);
  }
</style>
