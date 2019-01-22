<template>
<div>
  <a-card title="数据源管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <a-form layout='inline' class="ant-advanced-search-from" :form="form">
      <a-row :gutter="24">
        <a-col :span="5">
          <a-form-item >
            <a-input
              ref="searchLinkName"
              v-decorator="['searchLinkName']"
              placeholder="搜索条件" />
          </a-form-item>
        </a-col>
        <a-col :span="6" :style="{ textAling: 'right'}">
          <a-form-item>
            <a-button type="primary" @click="handleSearch" :loading="searchLoading">搜索</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" @click="showModel">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="search-result-list">
      <a-table :columns="columns" :dataSource="data" bordered :loading="loading">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :loading="tabload" @click="editFun($event, record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="go($event, record, '1')">抽取规则</a-button>
          <a-divider type="vertical" />
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

  interface axiosDatas {
    linkName: string,
    adress: string
  }
  /* interface modelFormDatas {
    db_host: string,
    db_password: string,
    db_port: number,
    db_user: string,
    link_name: string,
    report_source_id: number
  } */
 @Component({
   components: {}
 })
 export default class dataOrinig extends Vue {
  @Prop() private msg!: string;

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
    {title: '链接名', dataIndex: 'link_name', key: 'address', width: '15%'}, // fixed: 'left' 设置是否固定
    {title: '数据库地址', dataIndex: 'db_host', key: 'age', width: '25%'},
    {title: '账号名', dataIndex: 'db_user', key: 'name', width: '20%'},
    {title: '操作', dataIndex: '', key: '', width: '40%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
  ]
  data: Array<object> = [] // 定义表格内容
  modelTitle: string = '新增数据源'
  modelFormDatas: Array<object> = []
  editBtnReportId: string = ''

  beforeCreate () { // 挂载前创建ant form
    (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
    (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
    
    /* (this as any).$post('/custom/Datasmanage/getDataSourceList').then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        this.data = res.data;
        this.loading = false // 关闭加载动画
      } else {
        this.loading = false;
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }); */
  }
  mounted () {
    this.initDataFun(); // 请求表格数据
  }
  initDataFun ():void {
    let searchLinkName:string = (this as any).$refs.searchLinkName.value || '';
    (this as any).$post('/custom/Datasmanage/getDataSourceList', { linkName: searchLinkName }).then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        this.data = res.data;
        this.loading = false // 关闭加载动画
      } else {
        this.loading = false;
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    });
  }
  handleSearch (e: any):void { // 搜索方法
    e.preventDefault();
    this.initDataFun();
  }
  showModel ():void { // 新增显示模态框
    this.modelTitle = '新增数据源'
    this.visible = true;
  }
  handleCancel ():void { // 隐藏模态框
    this.visible = false;
    this.modalBtn = true;
    this.editBtnReportId = '' // 每次关闭模态框都将其id重置为空
    this.modelFormDatas = [];
    (this as any).modelForm.resetFields(); // 重置输入控件的值
  }
  handleCreate (e: any):void { // 点击模态框确认方法
    e.preventDefault();
    (this as any).modelForm.validateFields((err: any, values: any) => {
      if (!err) {
        let testConnectDatas:any = (this as any).modelForm.getFieldsValue(); // 获取表单中数据
        if (!this.editBtnReportId) { // 为空是新增
          this.addEditFun(testConnectDatas);
        } else {
          testConnectDatas.reportId = this.editBtnReportId;
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
        });
      }
    })
  }
  editFun (event: any, record: any): void { // 编辑方法
    this.tabload = true;
    console.log(record);
    this.modelTitle = '编辑数据源'
    this.visible = true; // 将模态框显示
    this.modelFormDatas = record;
    this.editBtnReportId = record.report_source_id;
    this.tabload = false;
    /* (this as any).$get('custom/Datasmanage/getDatasInfo', { 'reportId': record.report_source_id }).then((res: any) => {
      if (res.state === 2000) {
        this.tabload = false;
        this.modelTitle = '编辑数据源'
        this.visible = true; // 将模态框显示
        this.modelFormDatas = res.data;
        this.editBtnReportId = res.data.report_source_id;
      } else {
        this.tabload = false;
       (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch((err: any) => {
      this.tabload = false;
      console.log(err);
      (this as any).$message.error('请求失败', 3); // 弹出错误message
    }); */
  }
  go (e: any, record: any, num: string): void {
    e.preventDefault();
    let reportId: string = record.report_source_id;
    if (num === '1') { // 抽取规则

    } else if (num === '2') { // 报表管理
      window.open(window.location.origin + '/statementManagement?reportId=' + reportId); // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    } else { // 模型管理
      window.open(window.location.origin + '/modelManagement?reportId=' + reportId); // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    }
  }
  addEditFun (testConnectDatas: object): void { // 新增/编辑方法
    (this as any).$post('custom/Datasmanage/subDataSource', testConnectDatas).then((res: any) => {
      if (res.state === 2000) {
        this.visible = !this.visible; // 隐藏模态框
        (this as any).$message.success(res.message, 3);
        this.initDataFun();
      } else {
        (this as any).$message.error(res.message, 3);
      }
    });
  }
 }
</script>
<style lang='scss' scoped>
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
