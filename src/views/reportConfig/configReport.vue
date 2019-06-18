<template>
  <div>
    <a-spin :spinning="configspinning" delayTime="500">
      <div class="configReport">
        <a-row :gutter="8" v-if="allChartsData.length" > <!-- gutter配置间隔 -->
          <grid-layout
            :layout.sync="allChartsData"
            :col-num="12"
            :row-height="30"
            :is-draggable="draggableOrResize"
            :is-resizable="draggableOrResize"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent"
            ><!--
              drag-allow-from=".vue-draggable-handle"
              drag-ignore-from=".no-drag" -->
            <grid-item v-for="(item, index) in allChartsData" :key="'grid' + index"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :minH="2"
              :minW="item.type !== 'number' ? 4 : 2"
              :dragIgnoreFrom="'canvas'"
              @resized="resizedEvent"
            >
              <header class="lpc-charts-header">
                <p class="lpc-title-p">{{ item.main_board_title }}<br/> <span>{{ item.board_title }}</span></p>
                <span class="lpc-chart-icon" v-if="viewType !== 'look'"><a-icon type="edit" @click.stop="editChartFun(item, index)"/><a-icon type="close" @click.stop="delChartFun(item, index)"/></span>
                <span class="lpc-chart-icon" v-else><a-icon type="fullscreen" @click="fullScreenFun(item, index)"/></span>
              </header>
              <!-- <div ref="initStyle" > -->
                <div class="lpc-contentReport">
                  <configx-bar :paramsData="item" v-if="item.type === 'xBar'" :styles="parentStylexBar"></configx-bar>
                  <configy-bar :paramsData="item" v-if="item.type === 'yBar'" :styles="parentStyleyBar"></configy-bar>
                  <config-pie :paramsData="item" v-if="item.type === 'pie'" :styles="parentStylePie"></config-pie>
                  <config-line :paramsData="item" v-if="item.type === 'line'" :styles="parentStyleLine"></config-line>
                  <config-gauge :paramsData="item" v-if="item.type === 'gauge'" :styles="parentStyleGauge"></config-gauge>
                  <config-funnel :paramsData="item" v-if="item.type === 'funnel'" :styles="parentStyleFunnel"></config-funnel>
                  <config-table :paramsData="item" v-if="item.type === 'table'" :styles="parentStyleTable"></config-table>
                  <config-number :paramsData="item" v-if="item.type === 'number'" :styles="parentStyleNumber"></config-number>
                  <config-scatter :paramsData="item" v-if="item.type === 'scatter'" :styles="parentStyleScatter"></config-scatter>
                </div>
              <!-- </div> -->
              <footer class="lpc-charts-footer">
                <p class="lpc-footer-p" @click="footerLookFun(item)">查看报表</p><!-- ({{ item.foot_page }}) -->
              </footer>
            </grid-item>
          </grid-layout>
        </a-row>
      </div>
    </a-spin>
    <!-- 弹窗层 -->
    <a-modal
      :visible="fullModalVisible"
      :title="fullModalTitle"
      ref="fullModalTitle"
      @cancel="fullHandleCancel"
      width="80%"
      :footer="null"
      :bodyStyle="{ 'padding-bottom': 0 }"
      >
      <div class="lpc-modalFull">
        <configx-bar :paramsData="fullParams" v-if="fullType === 'xBar'"></configx-bar>
        <configy-bar :paramsData="fullParams" v-if="fullType === 'yBar'"></configy-bar>
        <config-pie :paramsData="fullParams" v-if="fullType === 'pie'"></config-pie>
        <config-line :paramsData="fullParams" v-if="fullType === 'line'"></config-line>
        <config-gauge :paramsData="fullParams" v-if="fullType === 'gauge'"></config-gauge>
        <config-funnel :paramsData="fullParams" v-if="fullType === 'funnel'"></config-funnel>
        <config-table :paramsData="fullParams" v-if="fullType === 'table'" :modalStype="modalStype"></config-table>
        <config-number :paramsData="fullParams" v-if="fullType === 'number'"></config-number>
        <config-scatter :paramsData="fullParams" v-if="fullType === 'scatter'"></config-scatter>
      </div>
    </a-modal>
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
    viewType:string = '' // 判断新增or编辑or查看
    numberTypeData:any = { 'value': 10, 'unit': 'K' }
    addOrEdit:boolean = false // 是新增false还是编辑true
    configspinning:boolean = false
    params:any = {}
    allChartsData:Array<any> = [
      /* { 'x': 0, 'y': 0, 'w': 4, 'h': 7, 'i': '5', 'select_rows': {}, 'main_board_title': '二狗子5', 'board_title': 'ergouzi', 'type': 'xBar', 'foot_page': 'ergouzi1' },
      { 'x': 4, 'y': 0, 'w': 8, 'h': 9,  'i': '1', 'select_rows': {}, 'main_board_title': '二狗子1', 'board_title': 'ergouzi', 'type': 'xBar', 'foot_page': 'ergouzi1' },
      { 'x': 8, 'y': 0, 'w': 4, 'h': 7, 'i': '2', 'select_rows': {}, 'main_board_title': '二狗子2', 'board_title': 'ergouzi', 'type': 'xBar', 'foot_page': 'ergouzi2' },
      { 'x': 0, 'y': 0, 'w': 4, 'h': 7, 'i': '3', 'select_rows': {}, 'main_board_title': '二狗子3', 'board_title': 'ergouzi', 'type': 'pie', 'foot_page': 'ergouzi3' },
      { 'x': 4, 'y': 4, 'w': 4, 'h': 7, 'i': '4', 'select_rows': {}, 'main_board_title': '二狗子4', 'board_title': 'ergouzi', 'type': 'xBar', 'foot_page': 'ergouzi1' } */
    ] // 所有内容数据
    parentStylexBar:any = {}
    parentStyleyBar:any = {}
    parentStylePie:any = {}
    parentStyleLine:any = {}
    parentStyleTable:any = {}
    parentStyleFunnel:any = {}
    parentStyleGauge:any = {}
    parentStyleNumber:any = {}
    parentStyleScatter:any = {}

    draggableOrResize:boolean = true // 配置是否可拖拽，放大缩小
    fullModalVisible:boolean = false
    fullModalTitle:string = ''
    fullType:string = '' // 扩大弹窗中的图表类型
    fullParams:any = {}
    modalStype:any = { 'height': 500 }
    @Emit('allChartsData') send (item:any) {}
    @Emit('howMany') howMany (item:any, chartid?:string) {}
    // 监听paintingReport 是因为如果其变化则显示验证公式按钮 deep: true, immediate: true
    @Watch('paintingReports') patintingWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        if (newVal.editType) { // 判断它是否有edit编辑标识
          delete newVal.editType
          this.$nextTick(() => {
            // this.allChartsData[newVal.index] = newVal
            this.allChartsData.splice(newVal.index, 1, newVal)
          })
        } else {
          this.$nextTick(() => {
            this.allChartsData.push(newVal)
          })
        }
        this.howMany(this.allChartsData)
      }
    }
    created () {
      this.viewType = (this as any).$route.query.viewType
      if (this.viewType !== 'add') {
        this.editOrLookGetDataFun()
      }
      this.viewType === 'look' ? this.draggableOrResize = false : ''
    }
    mounted () {
    }
    editOrLookGetDataFun():void { // 编辑或查看时查询数据
      let board_id:string = (this as any).$route.query.boardId;
      (this as any).$post('/custom/BoardManage/getBoardData', { board_id } ).then((res: any) => {
        if (res.state === 2000) {
          this.allChartsData = res.data.subunitData
          this.howMany(this.allChartsData)
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

    /* 拖拽等事件start */
    layoutUpdatedEvent (newLayout:any) { // 拖拽后更新
      // console.log('Updated layout: ', newLayout)
       this.howMany(newLayout) // 传递当前剩下的所有数据
    }
    resizedEvent (i:number, newH:number, newW:number, newHPx:number, newWPx:number) { // 改变大小结束
      // console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx);
      this.allChartsData.map((v:any, index:number) => { // 此处分开写做判断是因为区分各表传的值，不然每次拖拽后所有的都会传值过去
        if (v.i === i) {
          if (v.type === 'xBar') {
            this.parentStylexBar = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'yBar') {
            this.parentStyleyBar = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'pie') {
            this.parentStylePie = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'line') {
            this.parentStyleLine = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'gauge') {
            this.parentStyleGauge = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'funnel') {
            this.parentStyleFunnel = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'table') {
            this.parentStyleTable = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'number') {
            this.parentStyleNumber = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          } else if (v.type === 'scatter') {
            this.parentStyleScatter = { 'parentWidth': newWPx, 'parentHeight': newHPx }
          }
        }
      })
    }
    /* 拖拽等事件end */

    /* 编辑等操作start */
    editChartFun (item:any, index:number):void {
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
      this.howMany(this.allChartsData, chartId) // 传递当前剩下的所有数据及最大的i值 chart的id
      // this.send(this.allChartsData)
    }
    footerLookFun (item:any):void { // 查看报表
      let reportId:number = item.selected_rows.report_id
      if (this.viewType === 'look') { // 判断，只有当为查看时才能操作
        window.open(window.location.origin + '/reportTable?reportId=' + reportId)
      }
    }
    fullScreenFun (item:any, index:number):void { // 扩大展示按钮方法
      console.log(item)
      this.fullParams = item // Object.assign({}, item)
      this.fullType = item.type
      this.modalStype = { 'height': 500 }
      this.fullModalVisible = true
      this.fullModalTitle = '扩大查看报表'
    }
    fullHandleCancel ():void {
      this.fullModalVisible = false
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
      /* min-width: 446px; */
      height: calc(100% - 45px - 30px);
      // margin-top: 8px;
      overflow: hidden;
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
  .lpc-modalFull {
    height: 500px;
  }
</style>
