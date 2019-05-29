<template>
  <div>
    <a-spin :spinning="spinning" delayTime="500">
      <header class="lpc-header">
        <div class="header-left">
          <a-input ref="titleName" v-if="titleNameEdit" :value="titleName" @change="e => titleNameEditFun(e.target.value)" style="width: 200px;"/>
          <template v-else>{{titleName}}</template>
          <div v-if="!titleNameEdit" class="header-icon">
            <a-icon type="edit" @click="editTitleName"></a-icon>
          </div>
          <div v-else class="header-icon">
            <a-icon type="check" @click="saveEditTitleName"></a-icon>
            <a-icon type="close" @click="cancelEditTitleName"></a-icon>
          </div>
        </div>
        <div class="header-right">
          <a-tag color="#108ee9" @click="addReportModal"><a-icon type="plus" />添加组件</a-tag>
          <a-tag @click="showDrawer"><a-icon type="setting"/></a-tag>
          <a-tag color="#87d068">完成</a-tag>
        </div>
      </header>
      <section class="lpc-container">
        <a-drawer
          title="属性设置"
          placement="right"
          :closable="false"
          @close="onClose"
          :visible="visible">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-drawer>
        <div class="dashboardView">
          <div class="layout-container" ref="layout">
            <div class="gutter-example" >
              <a-row :gutter="8" v-for="(item, index) in row" :key="'gutter' + index"> <!-- gutter配置间隔 -->
                <a-col class="gutter-row" :span="2" v-for="(item, i) in 12" :key="'row' + i">
                  <div class="gutter-box"></div>
                </a-col>
              </a-row>
            </div>
            <div class="lpc-canvas">
              <div class="lpc-report">
                <config-report :paintingReports="paintingReport" @allChartsData="editChartData" @howMany="manyIndex"></config-report>
              </div>
            </div>
          </div>
        </div>
      </section>
    <!-- <router-view></router-view> -->
    </a-spin>

    <!-- 选择报表弹窗层 -->
    <a-modal
      :visible="addReportModalVisible"
      title="选择报表"
      okText='确认'
      cancelText='取消'
      @cancel="handleCancel"
      @ok="handleCreate"
      :bodyStyle="{ 'padding-bottom': 0 }"
      :okButtonProps="{props: { disabled: !addReportId.length } }">
      <a-form layout='inline' class="ant-advanced-search-from" :form="modelForm" style="margin-bottom: 20px;">
        <a-form-item :span="24">
          <a-input
            size="small"
            ref="reportName"
            v-decorator="['reportName']"
            placeholder="报表名称" />
        </a-form-item>
        <a-form-item :span="24">
          <a-input
            size="small"
            ref="sourceName"
            v-decorator="['sourceName']"
            placeholder="数据源名称" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="small" @click="handleSearch" :loading="searchLoading">搜索</a-button>
        </a-form-item>
      </a-form>
      <a-table :rowSelection="{ type: 'radio', onChange: onSelectChange, selectedRowKeys: addReportId }"
        :scroll="{ x: true, y: 240 }"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        @change="onChange"
        maskClosable="false"
        :loading="modalTabLoading"
        :rowKey="record => record.report_id"
        size="small" />
    </a-modal>

    <!-- 添加or编辑组件弹窗层 -->
    <a-modal
      :visible="addOrEditVisible"
      :title="addOrEditTitle"
      okText='确认'
      cancelText='取消'
      @cancel="addOrEditModalCancel"
      @ok="addOrEditModalOk"
      width="800px"
      :bodyStyle="{ 'padding': '0 0 0 24px' }" > <!-- :okButtonProps="{ props: { disabled: modalBtn } }" -->
      <section class="lpc-modalContainer">
        <aside class="left">
          <a-spin :spinning="addOrEditModalSpinning" delayTime="500">
            <a-form :form="reportModalForm" layout="vertical">
              <a-form-item label="报表">
                <a-input placeholder="报表名称" v-decorator="['report_name', { initialValue: selectedRows.report_name, rules: [{ required: false, message: '请输入报表名称' }]}]"/>
              </a-form-item>
              <a-form-item label="显示方式">
                <div class="modalImg" v-for="(item, index) in modalImg" :key="index" @click="modalImgToggle(item.type, index)">
                  <img :src="item.active ? item.activeSrc : item.src" alt="">
                </div>
              </a-form-item>
              <div v-show="selectChartsType === 'xBar' || selectChartsType === 'yBar' || selectChartsType === 'line'">
                <a-form-item label="X轴">
                  <a-select
                    defaultValue="create"
                    @change="XChange"
                    >
                    <a-select-option value="create">创建人</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="Y轴">
                  <a-select
                    defaultValue="nlSvg"
                    @change="YChange"
                    >
                    <a-select-option value="nlSvg">Number of Locations 总和</a-select-option>
                    <a-select-option value="yearSvg">年收入 总和</a-select-option>
                    <a-select-option value="employeesSvg">员工 总和</a-select-option>
                    <a-select-option value="recordSvg">记录计数</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div v-show="selectChartsType === 'pie' || selectChartsType === 'funnel'">
                <a-form-item label="值">
                  <a-select
                    defaultValue="nlSvg"
                    @change="YChange">
                    <a-select-option value="nlSvg">Number of Locations 总和</a-select-option>
                    <a-select-option value="yearSvg">年收入 总和</a-select-option>
                    <a-select-option value="employeesSvg">员工 总和</a-select-option>
                    <a-select-option value="recordSvg">记录计数</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="切块标准">
                  <a-select
                    defaultValue="create"
                    @change="XChange">
                    <a-select-option value="create">创建人</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div v-show="selectChartsType === 'number' || selectChartsType === 'gauge'">
                <a-form-item label="评测">
                  <a-select
                    defaultValue="nlSvg"
                    @change="YChange">
                    <a-select-option value="nlSvg">Number of Locations 总和</a-select-option>
                    <a-select-option value="yearSvg">年收入 总和</a-select-option>
                    <a-select-option value="employeesSvg">员工 总和</a-select-option>
                    <a-select-option value="recordSvg">记录计数</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <a-form-item label="显示单位">
                <a-select
                  defaultValue="auto"
                  @change="YChange"
                >
                  <a-select-option value="auto">缩短数字</a-select-option>
                  <a-select-option value="whole">全数字</a-select-option>
                  <a-select-option value="hundres">百</a-select-option>
                  <a-select-option value="thousands">数千</a-select-option>
                  <a-select-option value="millions">数百万</a-select-option>
                  <a-select-option value="billions">十亿</a-select-option>
                  <a-select-option value="trillions">万亿</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="标题">
                <a-input placeholder="标题" v-model="reportTitle"/>
              </a-form-item>
              <a-form-item label="副标题">
                <a-input placeholder="副标题" v-model="reportViceTitle"/>
              </a-form-item>
              <a-form-item label="页脚">
                <a-input placeholder="页脚" v-model="reportFooterTitle"/>
              </a-form-item>
            </a-form>
          </a-spin>
        </aside>
        <article class="right">
          <header>
            <p>预览</p>
          </header>
          <div class="lpc-previewChart">
            <article class="dashGridItem">
              <h2>
                <div class="gridHeader truncation">{{ reportTitle }}</div>
                <div class="gridTitle truncation">{{ reportViceTitle }}</div>
              </h2>
              <div class="lpc-contentReport">
                <configx-bar v-if="selectChartsType === 'xBar'"></configx-bar>
                <configy-bar v-if="selectChartsType === 'yBar'"></configy-bar>
                <config-pie v-if="selectChartsType === 'pie'"></config-pie>
                <config-line v-if="selectChartsType === 'line'"></config-line>
                <config-gauge v-if="selectChartsType === 'gauge'"></config-gauge>
                <config-funnel v-if="selectChartsType === 'funnel'"></config-funnel>
                <config-table v-if="selectChartsType === 'table'"></config-table>
                <config-number v-if="selectChartsType === 'number'"></config-number>
                <config-scatter v-if="selectChartsType === 'scatter'"></config-scatter>
              </div>
              <div class="gridFooter">
                <div class="truncation">
                  <span>查看报表({{ reportFooterTitle}})</span>
                </div>
              </div>
            </article>
          </div>
        </article>
      </section>
    </a-modal>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
  import configReport from './configReport.vue'
  import configPie from '@/components/config/configPie.vue'
  import configxBar from '@/components/config/configxBar.vue'
  import configyBar from '@/components/config/configyBar.vue'
  import configLine from '@/components/config/configLine.vue'
  import configGauge from '@/components/config/configGauge.vue'
  import configFunnel from '@/components/config/configFunnel.vue'
  import configNumber from '@/components/config/configNumber.vue'
  import configTable from '@/components/config/configTable.vue'
  import configScatter from '@/components/config/configScatter.vue'

  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
  @Component({
    components: { configReport, configTable, configNumber, configFunnel, configPie, configxBar, configyBar, configLine, configGauge, configScatter }
    // filters: { filterText (value:any) { console.log(value); return 'fuck' }}
  })
  export default class customConfigReport extends Vue {
    spinning:boolean = true
    addOrEditModalSpinning:boolean = true
    titleName:string = '报表名称'
    titleNameEdit:boolean = false // 配置报表名称修改
    cancelTitleNameFlag:string = '' // 用于取消还原修改
    visible:boolean = false // 抽屉
    row:number = 0
    columns: Array<object> = [ // 定义表格表头
      { title: '报表名称', dataIndex: 'report_name' }, // fixed: 'left' 设置是否固定
      { title: '报表数据源名称', dataIndex: 'report_resource_name' },
      { title: '报表主表名称', dataIndex: 'main_table_name' }
    ]
    pagination:pagination = { // 定义分页数据
      current: 1,
      pageSize: 10,
      total: 1
    }
    reportResourceId: string = '' // 数据源id
    data: Array<object> = [] // 定义表格内容
    addReportModalVisible:boolean = false // 添加组件弹窗
    // modalBtn:boolean = true // modal确认按钮控制
    searchLoading:boolean = false // modal中搜索按钮动画
    modalTabLoading:boolean = true // modal中table加载动画
    addReportId:Array<number> = [] // modal中选中的数据报表reportid

    selectedRows:any = {}
    addOrEditVisible:boolean = false
    addOrEditTitle:string = '添加组件'
    modalImg:Array<any> = [
      { type: 'xBar', active: true, src: require('../../assets/img/config/xBar.png'), activeSrc: require('../../assets/img/config/xBarActive.png') },
      { type: 'yBar', active: false, src: require('../../assets/img/config/yBar.png'), activeSrc: require('../../assets/img/config/yBarActive.png') },
      { type: 'line', active: false, src: require('../../assets/img/config/line.png'), activeSrc: require('../../assets/img/config/lineActive.png') },
      { type: 'pie', active: false, src: require('../../assets/img/config/pie.png'), activeSrc: require('../../assets/img/config/pieActive.png') },
      { type: 'number', active: false, src: require('../../assets/img/config/number.png'), activeSrc: require('../../assets/img/config/numberActive.png') },
      { type: 'gauge', active: false, src: require('../../assets/img/config/gauge.png'), activeSrc: require('../../assets/img/config/gaugeActive.png') },
      { type: 'funnel', active: false, src: require('../../assets/img/config/funnel.png'), activeSrc: require('../../assets/img/config/funnelActive.png') },
      { type: 'scatter', active: false, src: require('../../assets/img/config/scatter.png'), activeSrc: require('../../assets/img/config/scatterActive.png') },
      { type: 'table', active: false, src: require('../../assets/img/config/table.png'), activeSrc: require('../../assets/img/config/tableActive.png') }
    ]
    reportTitle:string = '测试报表' // 报表标题
    reportViceTitle:string = '副标题' // 报表副标题
    reportFooterTitle:string = '页脚哦' // 报表页脚
    selectChartsType:string = 'xBar' // 选中的图表类型 默认为xBar

    paintingReport:any = {}
    chartId:string = '0' // 添加的每个内容的id
    editIndex:number = 0 // 编辑哪一个下标

    beforeCreate () {
      (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
      (this as any).reportModalForm = (this as any).$form.createForm(this) // 定义modelform
    }
    created () {
    }
    mounted () {
      let clientHeight:number = document.body.offsetHeight - 49
      this.row = Math.ceil(clientHeight / 30) // 向上取整
      // window.onresize = () => {
      //   let clientHeight:any = document.body.offsetHeight - 49
      //   console.log(clientHeight / 30);
      //   this.row = Math.ceil(clientHeight / 30) // 向上取整
      // }
      // ((this as any).$refs.layout as HTMLDivElement).style.height = clientHeight + 'px';
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    }

    /* modal 弹窗start */
    addReportModal ():void { // 添加组件 弹出modal方法
      this.addReportModalVisible = true
      this.addReportId = [] // 重置选中报表id
      this.$nextTick(() => {
        let sourceName:string = (this as any).$refs.sourceName.value || '' // 连接名
        let reportName:string = (this as any).$refs.reportName.value || '' // 报表名
        let params:any = { reportResourceId: this.reportResourceId, reportName: reportName, sourceName: sourceName, pageSize: 10, nowpage: 1 }
        this.initDataFun(params) // 请求表格数据
      })
    }
    handleCancel ():void { // 隐藏模态框
      this.addReportModalVisible = false
      // this.modalBtn = true
      this.addReportId = []; // 每次关闭模态框都将其id重置为空
      (this as any).modelForm.resetFields(); // 重置输入控件的值
    }
    handleCreate ():void { // 选择报表modal确认按钮
      this.addReportModalVisible = false
      this.addOrEditVisible = true
      // this.selectChartsType = 'xBar' // 选中的图表类型 默认为xBar
      this.modalImgToggle('xBar', 0) // 重置
      console.log(this.selectChartsType)
      setTimeout(() => {
        this.addOrEditModalSpinning = false
      }, 600)
    }
    handleSearch (e: any):void { // 添加组件modal中搜索方法
      e.preventDefault()
      let sourceName:string = (this as any).$refs.sourceName.value || ''; // 连接名
      let reportName:string = (this as any).$refs.reportName.value || ''; // 报表名
      let params:any = { reportResourceId: this.reportResourceId, reportName: reportName, sourceName: sourceName, pageSize: 10, nowpage: 1 }
      this.initDataFun(params) // 请求表格数据
    }
    onChange (pagination: any):void {
      const pager:any = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      let sourceName:string = (this as any).$refs.sourceName.value || '' // 连接名
      let reportName:string = (this as any).$refs.reportName.value || '' // 报表名
      let params:any = { reportResourceId: this.reportResourceId, reportName: reportName, sourceName: sourceName, nowpage: pagination.current, pageSize: pagination.pageSize }
      this.initDataFun(params) // 请求表格数据
    }
    initDataFun (params:any):void {
      (this as any).$post('custom/ReportManage/getReportList', params).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          const pagination = { ...this.pagination }
          this.modalTabLoading = false // 关闭加载动画
          pagination.total = res.data.count
          this.data = res.data.data
          this.pagination = pagination
        } else {
          this.modalTabLoading = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3) // 弹出错误message
        }
        this.modalTabLoading = false
        this.data = []
      })
    }
    onSelectChange (selectedRowKeys:any, selectedRows:any) { // report表格弹窗选中事件
      this.addReportId = selectedRowKeys // 选中数据id
      this.selectedRows = selectedRows[0] // 选中数据
    }
    addOrEditModalCancel ():void { // 添加or编辑组件弹窗关闭事件
      this.addOrEditVisible = false
    }
    addOrEditModalOk ():void { // 添加or编辑组件弹窗确认事件
      this.addOrEditVisible = false
      this.paintingReport = { 
        'x': 0,
        'y': 0,
        'w': 4,
        'h': 7,
        'i': this.chartId,
        'selectedRows': this.selectedRows,
        'reportTitle': this.reportTitle,
        'reportViceTitle': this.reportViceTitle,
        'selectChartsType': this.selectChartsType,
        'reportFooterTitle': this.reportFooterTitle
      } // 每次添加默认宽度为4高度为7
      /* selectedRows: this.selectedRows, // 选中的report表数据
      reportTitle: this.reportTitle, // 报表标题
      reportViceTitle: this.reportViceTitle, // 报表副标题
      selectChartsType: this.selectChartsType // 图表类型 */

      this.chartId = (Number(this.chartId) + 1).toString()
      this.$nextTick(() => {
        // console.log(document.getElementsByClassName('layout-container')[0].scrollHeight)
        let clientHeight:number = document.getElementsByClassName('layout-container')[0].scrollHeight
        // console.log(clientHeight / 30);
        this.row = Math.ceil(clientHeight / 30) // 向上取整
      })
    }
    modalImgToggle (type:string, index:number):void { // 添加or编辑组件弹窗 显示方式img切换事件
      console.log(type) // 选中的图表类型
      this.selectChartsType = type // 赋值选中的类型
      this.modalImg.map((v:any, i:number) => {
        v.active = false
      })
      this.modalImg[index].active = true
    }
    XChange (value:string):void { // 添加or编辑组件弹窗 X轴change事件
      console.log(value)
    }
    YChange (value:string):void { // 添加or编辑组件弹窗 Y轴change事件
      console.log(value)
    }
    /* modal 弹窗end */

    /* 抽屉start */
    showDrawer ():void {
      this.visible = true
    }
    onClose ():void {
      this.visible = false
    }
    /* 抽屉end */

    /* 报表名称 修改方法 start */
    titleNameEditFun (e:string):void { // 报表名称修改方法
      this.titleName = e // 将输入的赋值给其名称
    }
    editTitleName ():void { // 点击修改按钮方法
      this.titleNameEdit = true
      this.cancelTitleNameFlag = this.titleName // 获取titleName作为flag用于取消还原
    }
    saveEditTitleName ():void { // 保存修改
      this.titleNameEdit = false
    }
    cancelEditTitleName ():void { // 取消还原修改
      this.titleNameEdit = false
      this.titleName = this.cancelTitleNameFlag // 取消时将之前的titleName还原
    }
    /* 报表名称 修改方法 end */

    /* 编辑操作start */
    manyIndex (index:number):void {
      console.log(index)
      this.editIndex = index
    }
    editChartData (item:any):void { // 子组件传递过来的删除后余下的最大id，用于接下来添加新模块id累加
      console.log(item)
      console.log(this.editIndex)
      this.addOrEditVisible = true
      // this.selectChartsType = 'xBar' // 选中的图表类型 默认为xBar
      this.modalImgToggle('xBar', 0) // 重置
      console.log(this.selectChartsType)
      setTimeout(() => {
        this.addOrEditModalSpinning = false
      }, 600)
      // let val:number = item
      // this.chartId = (Number(val) + 1).toString()
    }
    /* 编辑操作end */
  }
</script>

<style scoped>
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-example >>> .ant-row {
  margin-bottom: 10px
}
.gutter-example >>> .ant-row:last-child {
  margin-bottom: 0px;
}
.gutter-box {
  background: #00a0e921;
  padding: 5px 0;
  height: 30px;
}
.ant-modal-wrap >>> .ant-modal-body {
  padding-bottom: 0;
}
</style>

<style lang='less' scoped>
  header.lpc-header {
    line-height: 48px;
    background-color: #fafafa;
    border-bottom: 1px solid #d9d9d9;
    .header-left {
      display: inline-block;
      margin-left: 30px;
      .header-icon {
        display: inline-block;
        margin-left: 10px;
        font-size: 15px;
        .anticon-edit {
          color: #1dd9e2c7;
          cursor: pointer;
        }
        .anticon-check {
          color: #3fb54b;
          cursor: pointer;
          margin-right: 5px;
        }
        .anticon-close {
          color: #e84545;
          cursor: pointer;
        }
      }
    }
    .header-right {
      float: right;
      margin-right: 20px;
      margin-left: 10px;
      .anticon-plus {
        margin-right: 5px;
      }
    }
  }
  section.lpc-container {
    width: 100%;
    height: 100%;
    /* position: relative;
    top: 49px; */
    background-color: #f1f4f7;
    .dashboardView {
      height: 100%;
      width: 100%;
      overflow: visible;
      .layout-container {
        padding: 15px 10px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        .gutter-example {
          // background: url('../../assets/img/repeat.png') 0 0 repeat;
        }
        .lpc-canvas {
          position: absolute;
          // border: 1px solid red;
          padding: 5px;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          .lpc-report {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  // 添加组件弹窗样式
  .lpc-modalContainer {
    width: 776px;
    .left {
      width: 300px;
      height: 450px;
      padding: 12px;
      display: inline-block;
      overflow-y: auto;
      border-right: 1px solid #e0e5ee;
      .modalImg {
        display: inline-block;
        margin: 3px;
        border-radius: 5px;
        width: 40px;
        height:40px;
        /* border: 1px solid #b7d5ef61; */
        img {
          width: 40px;
          height:40px;
        }
      }
    }
    .right {
      width: 476px;
      height: 450px;
      padding: 12px;
      overflow: hidden;
      display: inline-block;
      background-color: #eef1f6;
      font-family: 'Salesforce Sans', Arial, Helvetica, sans-serif;
      header {
        color: #54698d;
        line-height: 40px;
      }
      .lpc-previewChart {
        position: relative;
        flex: 1;
        width: 100%;
        height: 365px;
        max-height: 365px;
        .dashGridItem {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          padding: 15px;
          overflow: hidden;
          background: rgb(255, 255, 255);
          border: 0;
          box-shadow: none;
          border-radius: 5px;
          .truncation {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          h2 {
            .gridHeader {
              color: #16325c;
              align-self: flex-start;
              font-size: 18px;
              width: calc(100% - 20px);
              font-weight: normal;
            }
            .gridTitle {
              color: #54698d;
              margin-top: 6px;
              font-size: 12px;
              max-height: 40px;
            }
          }
          .lpc-contentReport {
            width: 100%;
            height: 250px;
            margin-top: 8px;
            border: 1px solid red;
          }
          .gridFooter {
            font-size: 12px;
            margin-top: 8px;
            color: #54698d;
          }
        }
      }
    }
  }
</style>
