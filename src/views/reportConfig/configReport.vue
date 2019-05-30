<template>
  <div>
    <a-spin :spinning="configspinning" delayTime="500">
      <div class="configReport">
        <a-row :gutter="8" v-if="allChartsData.length" > <!-- gutter配置间隔 -->
            <!-- <a-col class="gutter-row" v-for="(item, index) in allChartsData" :key="'chart' + index" :span="initStyle.widthSpan">
              <div class="height-100 lpc-editbox" :style="{ height: initStyle.height }">{{ item.selectedRows.report_name }}</div>
            </a-col> -->
            <grid-layout
              :layout="allChartsData"
              :col-num="12"
              :row-height="30"
              :is-draggable="true"
              :is-resizable="true"
              :is-mirrored="false"
              :vertical-compact="true"
              :margin="[10, 10]"
              :use-css-transforms="true"
              ><!-- 
                @layout-updated="layoutUpdatedEvent"
              @layout-created="layoutCreatedEvent"
              @layout-before-mount="layoutBeforeMountEvent"
              @layout-mounted="layoutMountedEvent"
              @layout-ready="layoutReadyEvent"
                drag-allow-from=".vue-draggable-handle"
                drag-ignore-from=".no-drag" -->
              <grid-item v-for="(item, index) in allChartsData" :key="'grid' + index"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                @resize="resizeEvent"
                @move="moveEvent"
                @resized="resizedEvent"
                @moved="movedEvent"
              >
                <header class="lpc-charts-header">
                  <p class="lpc-title-p">{{ item.reportTitle }}{{ item.selectChartsType }}<br/> <span>{{ item.reportViceTitle }}</span></p>
                  <span class="lpc-chart-icon" v-if="!addOrEdit"><a-icon type="edit" @click.stop="editChartFun(item, index)"/><a-icon type="close" @click.stop="delChartFun(item, index)"/></span>
                  <span class="lpc-chart-icon" v-else><a-icon type="fullscreen" /></span>
                </header>
                <div class="lpc-contentReport">
                  <configx-bar v-if="item.selectChartsType === 'xBar'" :styles="parentStyle"></configx-bar>
                  <configy-bar v-if="item.selectChartsType === 'yBar'" :styles="parentStyle"></configy-bar>
                  <config-pie v-if="item.selectChartsType === 'pie'" :styles="parentStyle"></config-pie>
                  <config-line v-if="item.selectChartsType === 'line'" :styles="parentStyle"></config-line>
                  <config-gauge v-if="item.selectChartsType === 'gauge'" :styles="parentStyle"></config-gauge>
                  <config-funnel v-if="item.selectChartsType === 'funnel'" :styles="parentStyle"></config-funnel>
                  <config-table v-if="item.selectChartsType === 'table'" :styles="parentStyle"></config-table>
                  <config-number v-if="item.selectChartsType === 'number'" :styles="parentStyle"></config-number>
                  <config-scatter v-if="item.selectChartsType === 'scatter'" :styles="parentStyle"></config-scatter>
                </div>
                <footer class="lpc-charts-footer">
                  <p class="lpc-footer-p" @click="footerLookFun(item)">{{ item.reportFooterTitle }}</p>
                </footer>
              </grid-item>
          </grid-layout>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'
  import VueGridLayout from 'vue-grid-layout'
  import configPie from '@/components/config/configPie.vue'
  import configxBar from '@/components/config/configxBar.vue'
  import configyBar from '@/components/config/configyBar.vue'
  import configLine from '@/components/config/configLine.vue'
  import configGauge from '@/components/config/configGauge.vue'
  import configFunnel from '@/components/config/configFunnel.vue'
  import configNumber from '@/components/config/configNumber.vue'
  import configTable from '@/components/config/configTable.vue'
  import configScatter from '@/components/config/configScatter.vue'

  @Component({
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      configTable,
      configNumber,
      configFunnel,
      configPie,
      configxBar,
      configyBar,
      configLine,
      configGauge,
      configScatter
    }
  })
  export default class configReport extends Vue {
    @Prop({}) paintingReports!:any // 接收每次添加的数据
    
    addOrEdit:boolean = false // 是新增false还是编辑true
    configspinning:boolean = false
    allChartsData:Array<any> = [
      // { 'x': 0, 'y': 0, 'w': 4, 'h': 7, 'i': '10', 'selectedRows': {}, 'reportTitle': '二狗子', 'reportViceTitle': 'ergouzi', 'selectChartsType': 'xBar' }
       /* { 'x': 0,'y': 0,'w': 4,'h': 1,'i': '1' },
      { 'x': 4,'y': 0,'w': 4,'h': 2,'i': '1' },
      { 'x': 8,'y': 0,'w': 4,'h': 3,'i': '2' },

      { 'x': 0,'y': 6,'w': 4,'h': 4,'i': '3' },
      { 'x': 4,'y': 6,'w': 4,'h': 5,'i': '4' },
      { 'x': 8,'y': 6,'w': 4,'h': 6,'i': '5' },

      { 'x': 0,'y': 5,'w': 4,'h': 6,'i': '6' },
      { 'x': 4,'y': 7,'w': 4,'h': 6,'i': '7' },
      { 'x': 8,'y': 9,'w': 4,'h': 6,'i': '8' } */
    ] // 所有内容数据
    initStyle:any = { // 默认宽高
      height: '235px',
      widthSpan: 8
    }
    parentStyle:any = {}

    @Emit('allChartsData') send (item:any) {}
    @Emit('howMany') howMany (chartid:string) {}
    // 监听paintingReport 是因为如果其变化则显示验证公式按钮 deep: true, immediate: true
    @Watch('paintingReports') patintingWatch (newVal:any, oldVal:any) {
      // if (JSON.stringify(oldVal) == '{}') {
      //   this.parentStyle = {
      //     'parentWidth': 1,
      //     'parentHeight': 1
      //   }
      // }
      if (newVal && JSON.stringify(newVal) !== '{}') {
        if (newVal.editType) { // 判断它是否有edit编辑标识
          delete newVal.editType
          this.$nextTick(() => {
            this.allChartsData[newVal.index] = newVal
            // this.allChartsData.splice(newVal.index, 1, newVal)
          })
          console.log(this.allChartsData)
        } else {
          this.$nextTick(() => {
            this.allChartsData.push(newVal)
          })
        }
      }
    }
    created () {
      
    }
    mounted () {

    }
    /* 拖拽等事件start */
    layoutCreatedEvent (newLayout:any) {
      console.log('Created layout: ', newLayout)
    }
    /* layoutBeforeMountEvent (newLayout:any) {
      console.log('beforeMount layout: ', newLayout)
    }
    layoutMountedEvent (newLayout:any) {
      console.log('Mounted layout: ', newLayout)
    }
    layoutReadyEvent (newLayout:any) {
      console.log('Ready layout: ', newLayout)
    } */
    layoutUpdatedEvent (newLayout:any) { // 拖拽后更新
      console.log('Updated layout: ', newLayout)
    }

    resizeEvent (i:number, newH:number, newW:number, newHPx:number, newWPx:number) { // 改变大小时
      console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
    }
    resizedEvent (i:number, newH:number, newW:number, newHPx:number, newWPx:number) { // 改变大小结束
      console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      this.parentStyle = {
        'parentWidth': newWPx,
        'parentHeight': newHPx
      }
    }
    moveEvent (i:number, newX:number, newY:number) { // 拖拽时
      // console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY);
    }
    movedEvent (i:number, newX:number, newY:number) { // 拖拽结束
      console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY);
    }
    /* 拖拽等事件end */

    /* 编辑等操作start */
    editChartFun (item:any, index:number):void {
      // console.log(item)
      item.index = index // 把当前编辑的数据的下标传进去，然后修改完之后传递回来
      this.send(item) // 传递当前选中的给父组件
    }
    delChartFun (item:any, index:number):void { // 删除某个报表块。传递余下最大chartId给父组件
      // this.howMany(item.i) // 传递被删除id
      this.allChartsData.splice(index, 1)
      let chartId:string = '0'
      let max:any = this.allChartsData[0]
      this.allChartsData.map((v:any,i:number) => {
        max = +(max.i) > +(v.i) ? max : v
      })
      max ? chartId = max.i : ''
      console.log(chartId)
      this.howMany(chartId) // 传递当前剩下的最大的i值 chart的id
      // this.send(this.allChartsData)
    }
    footerLookFun (item:any):void {
      if (this.addOrEdit) { // 判断，只有当为编辑时才能操作
        console.log('footerLook')
      }
    }
    /* 编辑等操作end */
  }
</script>

<style scoped>
  .vue-grid-layout >>> .vue-grid-item {
    background: rgba(255, 255, 255, .8);
    border-radius: 5px;
  }
</style>

<style lang='less' >
  .configReport {
    width: 100%;
    height: 100%;
    background: transparent;
    .lpc-editbox {
      border: 1px solid red;
      margin-bottom: 5px;
    }
    .lpc-charts-header {
      width: 100%;
      height: 45px;
      max-height: 45px;
      overflow: hidden;
      .lpc-title-p {
        display: inline-block;
        font-size: 14px;
        margin-left: 14px;
        margin-top: 7px;
        color: #16325c;
        span {
          font-size: 10px;
          color: #54698d;
        }
      }
      .lpc-chart-icon {
        float: right;
        height: 45px;
        line-height: 45px;
        clear: both;
        .anticon {
          margin-right: 14px;
          cursor: pointer;
        }
      }
    }
    .lpc-contentReport {
      width: 100%;
      height: calc(100% - 45px - 30px);
      // margin-top: 8px;
      overflow: hidden;
      /* border: 1px solid red; */
    }
    .lpc-charts-footer {
      width: 100%;
      height: 30px;
      max-height: 30px;
      .lpc-footer-p {
        display: inline-block;
        font-size: 12px;
        margin-left: 14px;
        margin-bottom: 7px;
        color: #16325c;
        cursor: pointer;
      }
    }
  }
</style>
