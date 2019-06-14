<template>
  <div>
    <a-spin :spinning="spinning" delayTime="500">
      <header class="lpc-header">
        <div class="header-left">
          <a-input ref="boardName" v-if="boardNameEdit" :value="boardName" @change="e => boardNameEditFun(e.target.value)" style="width: 200px;"/>
          <template v-else>{{boardName}}</template>
          <div v-if="!boardNameEdit" class="header-icon">
            <a-icon type="edit" @click="editBoardName"></a-icon>
          </div>
          <div v-else class="header-icon">
            <a-icon type="check" @click="saveEditBoardName"></a-icon>
            <a-icon type="close" @click="cancelEditBoardName"></a-icon>
          </div>
        </div>
        <div class="header-right">
          <a-tag color="#108ee9" @click="addReportModal" v-if="viewType !== 'look'"><a-icon type="plus" />添加组件</a-tag>
          <a-tag @click="showDrawer"><a-icon type="setting"/></a-tag>
          <a-tag color="#87d068" v-if="viewType !== 'look'" @click="saveAllDatasFun">完成</a-tag>
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
            <div class="gutter-example">
              <a-row :gutter="8" v-for="(item, index) in row" :key="'gutter' + index"> <!-- gutter配置间隔 -->
                <a-col class="gutter-row" :span="2" v-for="(item, i) in 12" :key="'row' + i">
                  <div class="gutter-box" :class="{'lpc-gutter-bg': viewType !== 'look'}"></div>
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

    <!-- 报表名称框 -->
    <a-modal
      :visible="boardModalVisible"
      title="新增仪表盘"
      okText='确认'
      cancelText='取消'
      @cancel="boardCancel"
      @ok="boardCreate"
      :bodyStyle="{ 'padding-bottom': 0 }"
      :okButtonProps="{ props: { disabled: boardName == '' } }"
      >
      <a-form class="ant-advanced-search-from" :form="boardModelForm" style="margin-bottom: 20px;">
        <a-form-item label="仪表盘名称">
          <a-input v-model="boardName" placeholder="仪表盘名称" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 选择报表弹窗层 -->
    <a-modal
      :visible="addReportModalVisible"
      title="选择报表"
      okText='确认'
      cancelText='取消'
      @cancel="handleCancel"
      @ok="handleCreate"
      :bodyStyle="{ 'padding-bottom': 0 }"
      :okButtonProps="{props: { disabled: !addReportId.length } }"
      > <!-- :okButtonProps="{props: { disabled: !addReportId.length } }" -->
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
                <!--  <a-input placeholder="报表名称" v-decorator="['report_name', { initialValue: selectedRows.report_name, rules: [{ required: false, message: '请输入报表名称' }]}]"/> -->                
                <a-input-search placeholder="报表名称" readOnly v-decorator="['report_name', { initialValue: selectedRows.report_name }]" @search="resetReport" >
                  <a-button slot="enterButton">重选</a-button>
                </a-input-search>
              </a-form-item>
              <a-form-item label="显示方式">
                <div class="modalImg" v-for="(item, index) in modalImg" :key="index" @click="modalImgClick(item, index)" :class="!item.isToggle ? 'bukedian' : ''">
                  <img :src="item.active ? item.activeSrc : item.src" alt="">
                </div>
              </a-form-item>
              <div v-if="type === 'yBar'">
                <a-form-item label="Y轴">
                  <a-select
                    @change="YChange"
                    mode="multiple"
                    v-decorator="['field_name', { initialValue: yBargroup_name, rules: [{ required: true, message: '请选择字段键名' }]}]"
                  >
                    <a-select-option v-if="JSON.stringify(modalPreData) !== '{}'" v-for="(item, index) in modalPreData.x" :value="item.group_id">{{ item.group_title_name }}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="X轴">
                  <a-select
                    @change="XChange"
                    v-decorator="['group_name', {initialValue: yBarfield_name, rules: [{ required: true, message: '请选择纬度键名' }]}]"
                  >
                    <a-select-option v-for="(item, index) in modalPreData.y" :value="item.field_id">{{ item.col_title }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div v-if="type === 'xBar' || type === 'line'">
                <a-form-item label="X轴">
                  <a-select
                    @change="XChange"
                    mode="multiple"
                    v-decorator="['group_name', { initialValue: xBargroup_name, rules: [{ required: true, message: '请选择纬度键名' }]}]"
                  >
                    <!-- <a-select-option value="create">创建人</a-select-option> -->
                    <a-select-option v-if="JSON.stringify(modalPreData) !== '{}'" v-for="(item, index) in modalPreData.x" :value="item.group_id">{{ item.group_title_name }}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="Y轴">
                  <a-select
                    @change="YChange"
                    v-decorator="['field_name', {initialValue: field_name, rules: [{ required: true, message: '请选择字段键名' }]}]"
                  >
                    <a-select-option v-if="JSON.stringify(modalPreData) !== '{}'" v-for="(item, index) in modalPreData.y" :value="item.field_id">{{ item.col_title }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div v-if="type === 'pie' || type === 'funnel'">
                <a-form-item label="值">
                  <a-select
                    @change="YChange"
                    v-decorator="['field_name', { initialValue: field_name, rules: [{ required: true, message: '请选择字段键名' }]}]"
                  >
                    <a-select-option v-if="JSON.stringify(modalPreData) !== '{}'" v-for="(item, index) in modalPreData.y" :value="item.field_id">{{ item.col_title }}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="切块标准">
                  <a-select
                    @change="XChange"
                    v-decorator="['group_name', { initialValue: group_name, rules: [{ required: true, message: '请选择纬度键名' }]}]"
                  >
                    <!-- <a-select-option value="create">创建人</a-select-option> -->
                    <a-select-option v-if="JSON.stringify(modalPreData) !== '{}'" v-for="(item, index) in modalPreData.x" :value="item.group_id">{{ item.group_title_name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <!-- <div v-show="type === 'funnel'">
                <a-form-item label="值">
                  <a-select
                    @change="YChange"
                    v-decorator="[type + 'Value', { initialValue: 'nlSvg', rules: [{ required: false }]}]"
                  >
                    <a-select-option v-for="(item, index) in modalPreData.y" :value="item.group_field_name">{{ item.group_title_name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div> -->
              <div v-if="type === 'number' || type === 'gauge'">
                <a-form-item label="值">
                  <a-select
                    @change="XChange"
                    v-decorator="[ 'group_name', { initialValue: group_name, rules: [{ required: true, message: '请选择纬度键名' }]}]"
                  >
                    <a-select-option v-if="JSON.stringify(modalPreData) !== '{}'" v-for="(item, index) in modalPreData.x" :value="item.group_id">{{ item.group_title_name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <a-form-item label="显示单位">
                <a-select
                  labelInValue
                  @change="unitChange"
                  v-decorator="[ 'preUnit', { initialValue: preUnit, rules: [{ required: true, message: '请选择显示单位' }]}]"
                >
                  <a-select-option value="whole">全数字</a-select-option>
                  <a-select-option value="hundres">百</a-select-option>
                  <a-select-option value="thousands">数千</a-select-option>
                  <a-select-option value="ten_thousands">万</a-select-option>
                  <a-select-option value="millions">数百万</a-select-option>
                  <a-select-option value="billions">十亿</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="标题">
                <a-input placeholder="标题" @change="reportTitleChange($event, 'title')" v-decorator="[ 'reportTitle', { initialValue: reportTitle, rules: [{ required: true, message: '请填写标题' }]}]"/>
              </a-form-item>
              <a-form-item label="副标题">
                <a-input placeholder="副标题" @change="reportTitleChange($event, 'vice')" v-decorator="[ 'reportViceTitle', { initialValue: reportViceTitle, rules: [{ required: true, message: '请填写副标题' }]}]"/>
              </a-form-item>
              <a-form-item label="页脚">
                <a-input placeholder="页脚" @change="reportTitleChange($event, 'footer')" v-decorator="[ 'reportFooterTitle', { initialValue: reportFooterTitle, rules: [{ required: true, message: '请填写页脚名称' }]}]"/>
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
                <configx-bar :paramsData="params" v-if="type === 'xBar'"></configx-bar>
                <configy-bar :paramsData="params" v-if="type === 'yBar'"></configy-bar>
                <config-pie :paramsData="params" v-if="type === 'pie'"></config-pie>
                <config-line :paramsData="params" v-if="type === 'line'"></config-line>
                <config-gauge :paramsData="params" v-if="type === 'gauge'"></config-gauge>
                <config-funnel :paramsData="params" v-if="type === 'funnel'"></config-funnel>
                <config-table :paramsData="params" v-if="type === 'table'"></config-table>
                <config-number :paramsData="params" v-if="type === 'number'"></config-number>
                <config-scatter :paramsData="params" v-if="type === 'scatter'"></config-scatter>
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
  })
  export default class customConfigReport extends Vue {
    viewType:string = '' // 区分是新增or编辑or查看
    spinning:boolean = true
    boardModalVisible:boolean = false // 新增仪表盘弹窗
    addOrEditModalSpinning:boolean = true
    boardName:string = '仪表盘名称'
    boardNameEdit:boolean = false // 配置报表名称修改
    cancelBoardNameFlag:string = '' // 用于取消还原修改
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
    isImgToggle:Array<string> = [] // 存放选中报表支持那些图
    modalPreData:any = {} // 存放选中报表的x轴y轴信息

    yBargroup_name:Array<any> = []
    yBarfield_name:any = ''
    group_name:any = ''
    xBargroup_name:Array<any> = []
    field_name:any = ''

    preUnit:any = { key: 'whole', label: '全数字' } // 单位

    addOrEditVisible:boolean = false
    addOrEditTitle:string = '添加组件'
    modalImg:Array<any> = [
      { type: 'xBar', active: true, isToggle: true, src: require('../../assets/img/config/xBar.png'), activeSrc: require('../../assets/img/config/xBarActive.png') },
      { type: 'yBar', active: false, isToggle: true, src: require('../../assets/img/config/yBar.png'), activeSrc: require('../../assets/img/config/yBarActive.png') },
      { type: 'line', active: false, isToggle: true, src: require('../../assets/img/config/line.png'), activeSrc: require('../../assets/img/config/lineActive.png') },
      { type: 'pie', active: false, isToggle: true, src: require('../../assets/img/config/pie.png'), activeSrc: require('../../assets/img/config/pieActive.png') },
      { type: 'number', active: false, isToggle: true, src: require('../../assets/img/config/number.png'), activeSrc: require('../../assets/img/config/numberActive.png') },
      { type: 'gauge', active: false, isToggle: true, src: require('../../assets/img/config/gauge.png'), activeSrc: require('../../assets/img/config/gaugeActive.png') },
      { type: 'funnel', active: false, isToggle: true, src: require('../../assets/img/config/funnel.png'), activeSrc: require('../../assets/img/config/funnelActive.png') },
      /* { type: 'scatter', active: false, isToggle: true, src: require('../../assets/img/config/scatter.png'), activeSrc: require('../../assets/img/config/scatterActive.png') }, */
      { type: 'table', active: false, isToggle: true, src: require('../../assets/img/config/table.png'), activeSrc: require('../../assets/img/config/tableActive.png') }
    ]
    reportTitle:string = '' // 报表标题
    reportViceTitle:string = '' // 报表副标题
    reportFooterTitle:string = '' // 报表页脚
    type:string = 'xBar' // 选中的图表类型 默认为xBar

    paintingReport:any = {}
    chartId:string = '0' // 添加的每个内容的id
    
    x:number = 0
    y:number = 0 // 新增时用到的起始坐标
    chartEditFlag:boolean = false // 编辑判断字段
    editData:any = {} // 保存当前编辑的数据
    editAllData:Array<any> = [] // 保存当前页面所有布局数据
    allChartsType:Array<any> = [
      { 'index': 0, 'type': 'xBar' },
      { 'index': 1, 'type': 'yBar' },
      { 'index': 2, 'type': 'pie' },
      { 'index': 3, 'type': 'line' },
      { 'index': 4, 'type': 'funnel' },
      { 'index': 5, 'type': 'gauge' },
      { 'index': 6, 'type': 'number' },
      { 'index': 7, 'type': 'table' }
    ] // 报表类型
    params:any = {} // 请求图表参数

    beforeCreate () {
      (this as any).boardModelForm = (this as any).$form.createForm(this); // 定义新增仪表盘弹窗form
      (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
      (this as any).reportModalForm = (this as any).$form.createForm(this) // 定义modelform
    }
    created () {
      this.viewType = (this as any).$route.query.viewType
    }
    mounted () {
      let clientHeight:number = document.body.offsetHeight - 49
      this.row = Math.ceil(clientHeight / 38) // 向上取整
      // window.onresize = () => {
      //   let clientHeight:any = document.body.offsetHeight - 49
      //   console.log(clientHeight / 30);
      //   this.row = Math.ceil(clientHeight / 30) // 向上取整
      // }
      // ((this as any).$refs.layout as HTMLDivElement).style.height = clientHeight + 'px';
      setTimeout(() => {
        this.spinning = false
        if (this.viewType === 'add') {
          this.boardModalVisible = true
        }
      }, 1000)
    }

    /* modal 弹窗start */
    boardCancel ():void {
      this.boardModalVisible = false
    }
    boardCreate ():void {
      this.boardModalVisible = false
    }

    addReportModal ():void { // 添加组件 弹出modal方法
      this.addReportModalVisible = true
      this.addOrEditTitle = '添加组件'
      this.chartEditFlag = false // 添加时将编辑判断字段置为空
      this.addReportId = [] // 重置选中报表id
      this.reportTitle = '' // 报表标题
      this.reportViceTitle = '' // 报表副标题
      this.reportFooterTitle = ''; // 报表页脚
      (this as any).reportModalForm.resetFields(); // 重置输入控件的值
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
      // console.log(this.addReportId) // 选中的报表id
      if (this.addOrEditTitle === '编辑组件') {
        this.editData.selected_rows = this.selectedRows
      }
      // this.type = 'xBar' // 选中的图表类型 默认为xBar
      this.getImgToggleFun() // 获取可选用图表
      this.resetColdsGroupsDataFun() // 重置xy轴信息
      this.getColsAndGroupsFun() // 获取前置下拉框内容
    }
    getImgToggleFun ():void { // 第一步弹窗确认，根据报表id查询当前有哪些图支持该表
      (this as any).$post('/custom/BoardManage/checkReportChart', { 'report_id': this.addReportId.join() }).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          this.addOrEditModalSpinning = false
          /* res.data.chartsType.forEach((ele:number, ind:number) => { // y因为返回的是1234567，所以做一个对应的遍历处理
            this.allChartsType.map((v:any, i:number) => {
              if (v.index === ele) {
                this.isImgToggle.push(v.type)
              }
            })
          }) */
          this.isImgToggle = res.data.chartsType
          this.modalImg.map((v:any, i:number) => { // 先把是否可点击重置为所有的都可点击
            v.isToggle = true
          })
          if (this.isImgToggle.length) {
            let index:number = 0
            this.modalImg.map((v:any, i:number) => {
              if (this.isImgToggle.indexOf(v.type) == -1) { // 如果在返回的可选项中不存在
                v.isToggle = false
              }
              if (v.type === this.isImgToggle[0]) {
                index = i
              }
            })
            this.modalImgToggle(this.isImgToggle[0], index) // 重置
          } else {
            this.modalImg.map((v:any, i:number) => {
              v.isToggle = false
            })
            this.modalImgToggle('xBar', 0) // 重置
          }
        } else {
          this.addOrEditModalSpinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3) // 弹出错误message
        }
        this.addOrEditModalSpinning = false
        this.isImgToggle = []
      })
    }
    getColsAndGroupsFun ():void { // 第一步弹窗确认，根据报表id查询x轴y轴下拉框数据方法
      (this as any).$post('/custom/BoardManage/getColsAndGroups', { 'report_id': this.addReportId.join() }).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          this.addOrEditModalSpinning = false
          this.modalPreData = res.data
          console.log(this.modalPreData)
          // this.yBargroup_name.push({ key: `'${res.data.x[0].field_id}'`, label: res.data.x[0].col_title })
          this.group_name = res.data.x[0].group_id // 单个的
          this.xBargroup_name.push(res.data.x[0].group_id) // 多选的
          this.yBargroup_name.push(res.data.x[0].group_id) // 多选的
          if (res.data.y) { // 判断该字段是否存在
            this.yBarfield_name = res.data.y[0].field_id
            this.field_name = res.data.y[0].field_id
            // this.yBarfield_name = { key: `'${res.data.y[0].group_id}'`, label: res.data.y[0].group_title_name }
            // this.group_name = { key: `'${res.data.y[0].group_id}'`, label: res.data.y[0].group_title_name }
          }
          // this.field_name.push({ key: `'${res.data.x[0].field_id}'`, label: res.data.x[0].col_title })
          
          this.initGetChartsDataFun() // 每次改变都重新请求数据
        } else {
          this.addOrEditModalSpinning = false
          this.resetColdsGroupsDataFun();
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('失败', 3) // 弹出错误message
        }
        this.addOrEditModalSpinning = false
        this.resetColdsGroupsDataFun()
      })
    }
    resetColdsGroupsDataFun ():void { // 清空x、y轴信息
      this.modalPreData = {}
      this.yBargroup_name = []
      this.xBargroup_name = []
      this.yBarfield_name = ''
      this.group_name = ''
      this.field_name = ''
    }
    handleSearch (e: any):void { // 添加组件modal中搜索方法
      e.preventDefault()
      let sourceName:string = (this as any).$refs.sourceName.value || ''; // 连接名
      let reportName:string = (this as any).$refs.reportName.value || ''; // 报表名
      let params:any = { reportResourceId: this.reportResourceId, reportName: reportName, sourceName: sourceName, pageSize: 10, nowpage: 1 }
      this.initDataFun(params) // 请求表格数据
    }
    onChange (pagination: any):void { // 表格change事件
      const pager:any = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      let sourceName:string = (this as any).$refs.sourceName.value || '' // 连接名
      let reportName:string = (this as any).$refs.reportName.value || '' // 报表名
      let params:any = { reportResourceId: this.reportResourceId, reportName: reportName, sourceName: sourceName, nowpage: pagination.current, pageSize: pagination.pageSize }
      this.initDataFun(params) // 请求表格数据
    }
    initDataFun (params:any):void { // 请求表格数据
      (this as any).$post('custom/ReportManage/getReportList', params).then((res: any) => {
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
      this.addOrEditVisible = false;
      (this as any).reportModalForm.resetFields(); // 重置输入控件的值
    }
    addOrEditModalOk ():void { // 添加or编辑组件弹窗确认事件
      (this as any).reportModalForm.validateFields((err: any, values: any) => {
        if (!err) {
          let group_ids:string = ''
          if (this.type === 'yBar') {
            group_ids = this.yBargroup_name.join(',')
          } else if (this.type === 'xBar' || this.type === 'line') {
            group_ids = this.xBargroup_name.join(',')
          } else {
            group_ids = this.group_name
          }
          if (this.addOrEditTitle === '编辑组件') {
            this.paintingReport = {
              'x': this.editData.x,
              'y': this.editData.y,
              'w': this.editData.w,
              'h': this.editData.h,
              'i': this.editData.i,
              'selected_rows': this.editData.selected_rows,
              'main_board_title': this.reportTitle,
              'board_name': this.boardName,
              'board_title': this.reportViceTitle,
              'type': this.type,
              'foot_page': this.reportFooterTitle,
              'pre_unit': this.preUnit,
              'config_details': {
                'field_ids': this.type === 'yBar' ? this.yBarfield_name : this.field_name, // values.field_name.join(),
                'group_ids': group_ids // values.group_name
              },
              'index': this.editData.index, // 当前编辑的数据的下标
              'editType': true // 是否是编辑判断字段
            }
          } else {
            console.log(this.x, this.y)
            this.paintingReport = { // 新增添加的// 每次添加默认宽度为4高度为7
              'x': this.x,
              'y': this.y,
              'w': 4,
              'h': 8,
              'i': this.chartId,
              'selected_rows': this.selectedRows,
              'main_board_title': this.reportTitle, // 标题
              'board_name': this.boardName, // 仪表盘名称
              'board_title': this.reportViceTitle, // 副标题
              'type': this.type, // 图表类型
              'foot_page': this.reportFooterTitle, // 页脚
              'pre_unit': this.preUnit,
              'config_details': {
                'field_ids': this.type === 'yBar' ? this.yBarfield_name : this.field_name, // values.field_name.join(),
                'group_ids': group_ids // values.group_name
              }
            }
          }
          this.addOrEditVisible = false
          this.chartId = (Number(this.chartId) + 1).toString()
        }
      })
    }
    resetReport ():void { // 重新选择报表
      this.addReportModalVisible = true
      this.addOrEditVisible = false
    }
    modalImgClick (item:any, index:number) { // 点击显示方式切换方法
      if (!item.active) {
        this.modalImgToggle(item.type, index)
        this.type = item.type // 赋值选中的类型
        this.initGetChartsDataFun() // 每次改变都重新请求数据
      }
    }
    modalImgToggle (type:string, index:number):void { // 添加or编辑组件弹窗 显示方式img切换事件
      this.type = type // 赋值选中的类型
      this.modalImg.map((v:any, i:number) => {
        v.active = false
      })
      this.modalImg[index].active = true
    }
    XChange (value:any):void { // 添加or编辑组件弹窗 X轴change事件
      if (value.length <= 2) {
        if (this.type === 'yBar') {
          this.yBarfield_name = value
        } else {
          this.field_name = value
        }
        this.initGetChartsDataFun() // 每次改变都重新请求数据
      }
    }
    YChange (value:any):void { // 添加or编辑组件弹窗 Y轴change事件
      if (this.type === 'yBar') {
        this.yBargroup_name = value 
      } else {
        this.group_name = value
      }
      this.initGetChartsDataFun() // 每次改变都重新请求数据
    }
    unitChange (value:any):void { // // 添加or编辑组件弹窗 单位change事件
      console.log(value)
      this.preUnit = value
      this.initGetChartsDataFun() // 每次改变都重新请求数据
    }
    reportTitleChange (e:any, type:string):void { // 标题等input修改事件
      if (type === 'title') {
        this.reportTitle = e.target.value
      } else if (type === 'vice') {
        this.reportViceTitle = e.target.value
      } else if (type === 'footer') {
        this.reportFooterTitle = e.target.value
      }
    }
    initGetChartsDataFun ():void { // 获取图表数据方法
      /* let group_names:string = ''
      let field_names:string = ''
      if (this.type === 'yBar') {
        this.modalPreData.x.map((v:any, i:number) => {
          
        })
      } else {
        if (this.modalPreData.y) {
          this.modalPreData.y.map((v:any, i:number) => {
          
          })
        }
      } */
      let group_ids:string = ''
      if (this.type === 'yBar') {
        group_ids = this.yBargroup_name.join(',')
      } else if (this.type === 'xBar' || this.type === 'line') {
        group_ids = this.xBargroup_name.join(',')
      } else {
        group_ids = this.group_name
      }
      this.params = {
        'config_details': {
          'group_ids': group_ids,
          'field_ids': this.type === 'yBar' ? this.yBarfield_name : this.field_name,
        },
        'type': this.type,
        'pre_unit': this.preUnit,
        'selected_rows': this.selectedRows
      }
      console.log(this.params)
    }
    saveAllDatasFun ():void { // 点击完成方法
      console.log(this.editAllData)
      if (this.viewType !== 'add') {
        let board_id:string = (this as any).$route.query.boardId
        this.editAllData.map((v:any, i:number) => {
          v.board_id = board_id
        })
      }
      /* let params = {"subunitData":[
          {
              "x":1,
              "y":2,
              "selected_rows":{
                  "report_id":125,
                  "report_name":"报表明",
                  "report_resource_name":"数据源",
                  "main_table_name":"学员表"
              },
              "board_name":"仪表盘盘名",
              "board_title":2,
              "type":"xBar",
              "foot_page":3,
              "pre_unit":{
                  "key":"whole",
                  "label":"全数字"
              },
              "config_details":{
                  "field_ids":"23",
                  "group_ids":"7,1"
              },
              "moved":"12"
          }
      ]}; */
      (this as any).$post('/custom/BoardManage/boardAddSubUnit', { 'subunitData': this.editAllData }).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          (this as any).$message.success(res.message, 1) // 弹出错误message
          setTimeout(() => {
            (this as any).$router.push({ path: '/instrumentPanelMake' }) // 仪表盘管理
          }, 1500);
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
    boardNameEditFun (e:string):void { // 报表名称修改方法
      this.boardName = e // 将输入的赋值给其名称
    }
    editBoardName ():void { // 点击修改按钮方法
      this.boardNameEdit = true
      this.cancelBoardNameFlag = this.boardName // 获取boardName作为flag用于取消还原
    }
    saveEditBoardName ():void { // 保存修改
      this.boardNameEdit = false
    }
    cancelEditBoardName ():void { // 取消还原修改
      this.boardNameEdit = false
      this.boardName = this.cancelBoardNameFlag // 取消时将之前的boardName还原
    }
    /* 报表名称 修改方法 end */

    /* 编辑操作start */
    manyIndex (item:any, id?:string):void {
      if (id) {
        +id ? this.chartId = (+id + 1).toString() : this.chartId = id
      }
      this.editAllData = item
      console.log(this.editAllData)
      setTimeout(() => {
        console.log('length' + this.editAllData.length)
        if (this.editAllData.length) {
          this.boardName = this.editAllData[0].board_name
          this.editAllData.map((v:any, i:number) => {
            this.y += v.h
          })
          this.x = this.editAllData[this.editAllData.length - 1].x // 获取上一个的x起点
          let w = this.editAllData[this.editAllData.length - 1].w // 获取上一个的w宽度
          // this.y = this.editAllData[this.editAllData.length - 1].y
          if ((this.x + w) >= 0 && (this.x + w) <= 8) {
            this.x = this.x + this.editAllData[this.editAllData.length - 1].w
          } else if ((this.x + w) > 8) { // 如果大于8，则换一行
            this.x = 0
          }
          console.log('12312312312312312qweqwe')
          console.log(this.x , this.y)
        }
      }, 500);
      
      this.$nextTick(() => {
        let clientHeight:number = document.getElementsByClassName('lpc-canvas')[0].scrollHeight
        this.row = Math.ceil(clientHeight / 30) // 向上取整
      })
    }
    editChartData (item:any):void { // 点击图编辑按钮 子组件传递过来的当前编辑的项的数据及当前所编辑的第几个
      this.chartEditFlag = true // 编辑判断字段
      this.addOrEditVisible = true
      this.addOrEditTitle = '编辑组件'
      this.editData = item // 保存当前编辑的数据
      // this.type = 'xBar' // 选中的图表类型 默认为xBar
      this.modalImg.map((v:any, i:number) => {
        if (v.type === item.type) {
          this.modalImgToggle(item.type, i) // 选中回显
        }
      })
      this.reportTitle = item.main_board_title // 报表标题
      this.reportViceTitle = item.board_title // 报表副标题
      this.reportFooterTitle = item.foot_page // 报表页脚
      (this as any).reportModalForm.resetFields() // 重置验证
      // console.log(this.type)
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
  padding: 5px 0;
  height: 30px;
}
.lpc-gutter-bg {
  background: #00a0e921;
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
        cursor: pointer;
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
      .bukedian {
        cursor: not-allowed;
        background-color: #5e595952;
        img {
          // visibility: hidden;
          opacity: .5;
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
