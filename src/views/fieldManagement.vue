<template>
<div>
  <a-card title="模型管理/字段管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" :loading="addBtnLoading" @click="showModel">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 表格 -->
    <div class="search-result-list">
      <a-table :pagination="pagination" :loading="loading" @change="onChange" :columns="columns" :dataSource="data" bordered :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :data-type="record.key" @click="editFun($event, record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" :loading="delBtnLoading" @click="deleteFun($event, record)">删除</a-button>
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
      >
        <a-form :form="modelForm">
          <a-form-item label='字段名' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="field_name"
              v-decorator="['field_name', { initialValue: editDataEcho.field_name, rules: [{ required: true, message: '请输入字段名' }]}]"
              placeholder="字段名"
            />
          </a-form-item>
          <a-form-item label='字段标题' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="field_title"
              v-decorator="['field_title', { initialValue: editDataEcho.field_title, rules: [{ required: true, message: '请输入字段标题' }]}]"
              placeholder="字段标题"
            />
          </a-form-item>
          <a-form-item label="字段类型" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-select 
              ref="field_type"
              placeholder="字段类型"
              v-decorator="['field_type', { initialValue: editDataEcho.field_type, rules: [{ required: true, message: '请选择字段类型' }]}]"
            >
              <a-select-option v-for="(item,i) in filedTypeData" :value="item.filed_type_value" :key="i">{{item.field_type}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label='参数' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-textarea
              ref="extra"
              v-decorator="['extra', { initialValue: editDataEcho.extra, rules: [{ message: '请输入字段参数' }]}]"
              placeholder="参数"
            />
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

  loading:boolean = true
  visible:boolean = false // 控制模态框
  modelCol: object = {
    label: {span: 8},
    wrapper: {span: 12}
  }
  columns: Array<object> = [
    {title: '编号', dataIndex: 'id', key: ''}, // fixed: 'left' 设置是否固定
    {title: '字段', dataIndex: 'field_title', key: ''},
    {title: '名称', dataIndex: 'field_name', key: ''},
    {title: '数据类型', dataIndex: 'field_type', key: ''},
    {title: '操作', dataIndex: '', key: '', width: '30%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
  ]
  model_id:string = ''
  modelTitle:string = '新增字段'
  data: Array<object> = []
  filedlId:string = '' // 判断是新增或是编辑
  filedTypeData:Array<object> = [] // 字段列表
  editDataEcho:object = {}
  editBtnLoading:boolean = false
  addBtnLoading:boolean = false
  delBtnLoading:boolean = false
  selectedRowKeys:Array<string> = [] // 存放表格选中的数据
  pagination:pagination = { // 定义分页数据
    current: 1,
    pageSize: 10,
    total: 1
  }

  beforeCreate () { // 挂载前创建ant form
    // (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
    (this as any).modelForm = (this as any).$form.createForm(this); // 定义modalform
  }
  mounted () {
    console.log((this as any).$route.query.model_id)
    this.model_id = (this as any).$route.query.model_id
    let params: any = { model_id: this.model_id, pageSize: 10, nowpage: 1 }
    this.initDataFun(params) // 请求表格数据
    this.initFieldTypeFun() // 请求字段类型列表
  }
  initDataFun (params:any):void { // 初始化请求列表
    this.loading = true;
    (this as any).$post('/custom/Attribute/filedsList', params).then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        const pagination = { ...this.pagination }
        // pagination.current = res.data.nowpage;
        // pagination.pageSize = 10;
        this.loading = false // 关闭加载动画
        pagination.total = res.data.count;
        this.data = res.data.data;
        this.pagination = pagination
      } else {
        this.loading = false;
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch((err: any) => {
      console.log(err)
      this.loading = false;
      this.data = [];
      (this as any).$message.error('请求失败', 3); // 弹出错误message
    });
  }
  initFieldTypeFun ():void { // 初始化请求字段类型列表
    this.loading = true;
    (this as any).$get('/custom/Attribute/fieldType').then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        this.filedTypeData = res.data;
      } else {
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch((err: any) => {
      console.log(err);
      (this as any).$message.error('请求失败', 3); // 弹出错误message
    });
  }
  showModel () { // 模态框
    this.visible = !this.visible
    this.addBtnLoading = true
    this.modelTitle = '新增字段'
  }
  handleCancel () { // 隐藏模态框
    this.visible = false
    this.addBtnLoading = false
    this.editBtnLoading = false
    this.editDataEcho = {};
    (this as any).modelForm.resetFields(); // 重置输入控件的值
  }
  handleCreate (e: any):void { // 新增编辑确认方法
    e.preventDefault();
    (this as any).modelForm.validateFields((err: any, values: any) => {
      if (!err) {
        let params: any = values;
        params.model_id = this.model_id // 传模型id
        const url:string = '/custom/Attribute/updateField';
        if (!this.filedlId) { // 新增
          this.addEditModelFun(params, url)
        } else {
          params.id = this.filedlId
          this.addEditModelFun(params, url)
        }
      }
    })
  }
  editFun (event: any, record: any): void { // 点击编辑方法
    this.visible = true // 将模态框
    this.modelTitle = '编辑字段'
    this.filedlId = record.id // 字段id
    this.editDataEcho = record; // 将信息带过来回显
  }
  addEditModelFun (params:any, url: string):void {
    (this as any).$post(url, params).then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        this.filedlId = '' // 将判断id重置为空
        this.editDataEcho = {};
        (this as any).modelForm.resetFields(); // 清空表单
        this.visible = !this.visible; // 隐藏模态框
        this.addBtnLoading = false
        this.editBtnLoading = false;
        (this as any).$message.success(res.message, 3);
        console.log(this.pagination)
        let par: object = { model_id: this.model_id, nowpage: this.pagination.current, pageSize: this.pagination.pageSize }
        this.initDataFun(par);
      } else {
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    });
  }
  onSelectChange (selectedRowKeys: any):void {
    this.selectedRowKeys = selectedRowKeys
  }
  onChange (pagination:any):void {
    const pager:any = { ...this.pagination };
    pager.current = pagination.current;
    this.pagination = pager
    let params: object = { model_id: this.model_id, nowpage: pagination.current, pageSize: pagination.pageSize }
    this.initDataFun(params);
  }
  deleteFun (e:any, record:any):void {
    e.preventDefault();
    this.delBtnLoading = !this.delBtnLoading
    let params: object = { field_id: record.id };
    this.showConfirm('提示', '确认要删除该字段么？', params)
  }
  showConfirm (title: string, content: string, params: any) { // 弹出确认对话框
    let _this:any = this;
    (this as any).$confirm({
      title: title,
      content: content,
      okType: 'danger',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        _this.delFieldFun(params)
      },
      onCancel () {
        _this.delBtnLoading = !_this.delBtnLoading; 
      }
    })
  }
  delFieldFun (params:any):void {
    (this as any).$get('custom/Attribute/del', params).then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        let par: object = { model_id: this.model_id, nowpage: this.pagination.current, pageSize: this.pagination.pageSize }
        this.initDataFun(par);
        (this as any).$message.success(res.message, 3);
        this.delBtnLoading = !this.delBtnLoading;
      } else {
        this.delBtnLoading = !this.delBtnLoading;
        (this as any).$message.error(res.message, 3); // 弹出错误message
      }
    }).catch(() => {
      this.delBtnLoading = !this.delBtnLoading;
      (this as any).$message.error('删除失败', 3);
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
  .operation {
    padding: 10px 10px;
    button {
      margin-right: 8px;
    }
  }
  .search-result-list {
    border-radius: 0 0 6px 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding: 10px;
  }
}
</style>
