<template>
<div>
  <a-card title="数据源管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <a-form layout='inline' class="ant-advanced-search-from" :form="form">
      <a-form-item>
        <a-input
          ref="searchLinkName"
          v-decorator="['searchLinkName']"
          placeholder="搜索条件" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch" :loading="searchLoading">搜索</a-button>
      </a-form-item>
    </a-form>
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" @click="showModel" :loading="addLoading">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="search-result-list">
      <a-table :scroll="{x: true}" :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="onChange" :loading="loading" :rowKey="record => record.report_source_id">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :loading="tabload" @click="editFun($event, record)">编辑</a-button>
          <a-divider type="vertical" />
          <!-- <a-button type="primary" size="small" @click="go($event, record, '1')">抽取规则</a-button>
          <a-divider type="vertical" /> -->
          <a-button type="primary" size="small" @click="go($event, record, '2')">报表管理</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="go($event, record, '3')">模型管理</a-button>
        </span>
      </a-table>
    </div>
    <!-- 弹窗层 -->
    <a-modal
        :visible="visible"
        :title="modelTitle"
        okText='确认'
        cancelText='取消'
        @cancel="handleCancel"
        @ok="handleCreate"
        :okButtonProps="{props: {disabled: modalBtn} }"
      >
        <a-form id="collectionForm" :form="modelForm">
          <a-form-item label='连接名' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="linkName"
              v-decorator="['linkName', { initialValue: modelFormDatas.link_name, rules: [{ required: true, message: '请输入连接名' }]}]"
              placeholder="连接名"
            />
          </a-form-item>
          <a-form-item label='数据库名' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="dbName"
              v-decorator="['dbName', { initialValue: modelFormDatas.db_name, rules: [{ required: true, message: '请输入数据库名' }]}]"
              placeholder="数据库名"
            />
          </a-form-item>
          <a-form-item label='数据库地址' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="dbHost"
              v-decorator="['dbHost', { initialValue: modelFormDatas.db_host, rules: [{ required: true, message: '请输入数据库地址' }]}]"
              placeholder="数据库地址"
            />
          </a-form-item>
          <a-form-item label='端口号' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="dbPort"
              v-decorator="['dbPort', { initialValue: modelFormDatas.db_port, rules: [{ required: true, message: '请输入端口号' }]}]"
              placeholder="端口号"
            />
          </a-form-item>
          <a-form-item label='数据库账号' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="dbUser"
              v-decorator="['dbUser', { initialValue: modelFormDatas.db_user, rules: [{ required: true, message: '请输入数据库账号' }]}]"
              placeholder="数据库账号"
            />
          </a-form-item>
          <a-form-item label='密码' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="dbPassword"
              v-decorator="['dbPassword', { initialValue: modelFormDatas.db_password, rules: [{ required: true, message: '请输入数据库密码' }]}]"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item :wrapperCol="{span: 12, offset: 8}" style="margin-bottom: 0">
            <a-button type="primary" @click="testLinkFun">测试链接</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
  </div>
</div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { interfaces } from 'mocha';
  import { State, Mutation } from 'vuex-class'

  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
 @Component({
   components: {}
 })
 export default class dataOrinig extends Vue {
  @Prop() private msg!: string;

  addLoading:boolean = false // 新增按钮动画
  searchLoading:boolean = false // 搜索按钮加载效果
  tabload:boolean = false // 控制btn加载效果
  loading:boolean = true // 初始化显示loading加载动画
  visible:boolean = false // 控制模态框
  modalBtn:boolean = true // 控制新增编辑时确认按钮
  modelCol:object = { // 设置栅格比例
    label: {span: 8},
    wrapper: {span: 12}
  }
  columns: Array<object> = [ // 定义表格表头
    {title: '链接名', dataIndex: 'link_name', key: ''}, // fixed: 'left' 设置是否固定
    {title: '数据库地址', dataIndex: 'db_host', key: ''},
    {title: '账号名', dataIndex: 'db_user', key: ''},
    {title: '数据库名', dataIndex: 'db_name', key: ''},
    {title: '操作', dataIndex: '', key: '', width: '40%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
  ]
  data: Array<object> = [] // 定义表格内容
  modelTitle: string = '新增数据源'
  modelFormDatas: object = {}
  editBtnReportId: string = '' // 判断是否新增
  pagination:pagination = { // 定义分页数据
    current: 1,
    pageSize: 10,
    total: 1
  }

  beforeCreate () { // 挂载前创建ant form
    (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
    (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
  }
  mounted () {
    let searchLinkName:string = (this as any).$refs.searchLinkName.value || '';
    let params:any = { linkName: searchLinkName, pageSize: 10, nowpage: 1 }
    this.initDataFun(params); // 请求表格数据
  }
  initDataFun (params:any):void {
    (this as any).$post('/custom/Datasmanage/getDataSourceList', params).then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        const pagination = { ...this.pagination }
        this.loading = false // 关闭加载动画
        pagination.total = res.data.count;
        this.data = res.data.data;
        this.pagination = pagination
      } else {
        this.loading = false;
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        (this as any).$message.error('请求超时', 3); // 弹出错误message
      } else {
        (this as any).$message.error('请求失败', 3); // 弹出错误message
      }
      this.loading = false;
      this.data = [];
    });
  }
  handleSearch (e: any):void { // 搜索方法
    e.preventDefault();
    let searchLinkName:string = (this as any).$refs.searchLinkName.value || '';
    let params:any = { linkName: searchLinkName, pageSize: 10, nowpage: 1 }
    this.initDataFun(params);
  }
  showModel ():void { // 新增显示模态框
    this.modelTitle = '新增数据源'
    this.visible = true
    this.addLoading = true
  }
  handleCancel ():void { // 隐藏模态框
    this.visible = false;
    this.modalBtn = true;
    this.addLoading = false
    this.editBtnReportId = '' // 每次关闭模态框都将其id重置为空
    this.modelFormDatas = {};
    (this as any).modelForm.resetFields(); // 重置输入控件的值
  }
  handleCreate (e: any):void { // 点击模态框确认方法
    e.preventDefault();
    (this as any).modelForm.validateFields((err: any, values: any) => {
      if (!err) {
        let testConnectDatas:any = (this as any).modelForm.getFieldsValue(); // 获取表单中数据
        if (!this.editBtnReportId) { // 为空是新增
          testConnectDatas.type = 'add'
          this.addEditFun(testConnectDatas);
        } else {
          testConnectDatas.reportId = this.editBtnReportId;
          testConnectDatas.type = 'update'
          this.addEditFun(testConnectDatas);
        }
      }
    })
  }
  testLinkFun (e: any):void { // 测试链接方法
    e.preventDefault();
    (this as any).modelForm.validateFields((err: any, values: any) => {
      if (!err) {
        let testConnectDatas = (this as any).modelForm.getFieldsValue(['dbHost', 'dbUser', 'dbPassword', 'dbPort', 'dbName']); // 获取表单中数据
        (this as any).$post('custom/Datasmanage/testConnectDatas', testConnectDatas).then((res: any) => {
          if (res.state === 2000) {
            this.modalBtn = false;
            (this as any).$message.success(res.message, 3);
          } else {
            (this as any).$message.error(res.message, 3);
          }
        }).catch((err:any) => {
          if (err.code === 'ECONNABORTED') {
            (this as any).$message.error('请求超时', 3); // 弹出错误message
          } else {
            (this as any).$message.error('请求失败', 3)
          }
        });
      }
    })
  }
  editFun (event: any, record: any): void { // 编辑方法
    this.tabload = true;
    console.log(record)
    this.modelTitle = '编辑数据源'
    this.visible = true; // 将模态框显示
    this.modelFormDatas = record;
    this.editBtnReportId = record.report_source_id;
    this.tabload = false;
  }
  go (e: any, record: any, num: string): void {
    e.preventDefault();
    let reportId: string = record.report_source_id;
    if (num === '2') { // 报表管理
      window.open(window.location.origin + '/statementManagement?reportResourceId=' + reportId); // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    } else { // 模型管理
      window.open(window.location.origin + '/modelManagement?reportId=' + reportId); // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    }
  }
  addEditFun (testConnectDatas: object): void { // 新增/编辑方法
    (this as any).$post('custom/Datasmanage/subDataSource', testConnectDatas).then((res: any) => {
      if (res.state === 2000) {
        this.addLoading = false;
        this.editBtnReportId = '' // 将判断id重置为空
        this.modelFormDatas = {}; // 回显信息置空
        (this as any).modelForm.resetFields(); // 清空表单
        this.visible = !this.visible; // 隐藏模态框
        (this as any).$message.success(res.message, 3);
        let searchLinkName:string = (this as any).$refs.searchLinkName.value || '';
        let params:any = { linkName: searchLinkName, nowpage: this.pagination.current, pageSize: this.pagination.pageSize }
        this.initDataFun(params);
      } else {
        (this as any).$message.error(res.message, 3);
      }
    }).catch((err:any) => {
      if (err.code === 'ECONNABORTED') {
        (this as any).$message.error('请求超时', 3); // 弹出错误message
      } else {
        (this as any).$message.error('请求失败', 3)
      }
    });
  }
  onChange (pagination: any) {
    const pager:any = { ...this.pagination };
    pager.current = pagination.current;
    this.pagination = pager
    let searchLinkName:string = (this as any).$refs.searchLinkName.value || '';
    let params: object = { linkName: searchLinkName, nowpage: pagination.current, pageSize: pagination.pageSize }
    this.initDataFun(params);
  }
 }
</script>
<style lang='scss' scoped>
.ant-card-head-title {
  font-weight: bolder;
}
.dataOrigin {
  margin: 10px;
  .ant-form {
    max-width: none;
  }
  .ant-advanced-search-from {
    padding: 16px;
    background: #fbfbfb;
    /* border: 1px solid #d9d9d9; */
    border-radius: 6px 6px 0 0;
  }
  .operation {
    padding: 10px 10px;
  }
  .search-result-list {
    /* margin-top: 16px;
    border: 1px dashed #e9e9e9; */
    border-radius: 0 0 6px 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding: 10px;
  }
}
</style>
