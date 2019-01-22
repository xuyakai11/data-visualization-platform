<template>
<div>
  <a-card title="模型管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" @click="changeState" :disabled="!hasSelected">启用</a-button>
          <a-button type="primary" htmlType="button" @click="changeState" :disabled="!hasSelected">禁用</a-button>
          <a-button type="primary" htmlType="button" @click="showModel">生成</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 表格 -->
    <div class="search-result-list">
      <a-table bordered :pagination="pagination" :loading="loading" @change="onChange" :columns="columns" :dataSource="data" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"><!-- :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" -->
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small">禁用</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="editFun($event, record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="go($event, record)">字段管理</a-button>
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
        <a-form id="collectionForm" :form="modelForm">
          <a-form-item label='模型标识' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="name"
              v-decorator="['name', { initialValue: editDataEcho.name, rules: [{ required: true, message: '请输入连接名' }]}]"
              placeholder="模型标识"
            />
          </a-form-item>
          <a-form-item label='模型名称' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="title"
              v-decorator="['title', { initialValue: editDataEcho.title, rules: [{ required: true, message: '请输入数据库地址' }]}]"
              placeholder="模型名称"
            />
          </a-form-item>
          <a-form-item label="数据表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-select 
              :disabled="selectDisabled"
              placeholder="数据表"
              v-decorator="['table', { initialValue: editDataEcho.table, rules: [{ required: true, message: '请选择数据表' }]}]"
              showSearch
              optionFilterProp="children"
              :filterOption="filterOption"
            >
              <a-select-option v-for="(item,i) in dbDataTabSelect" :value="item" :key="i">{{item}}</a-select-option>
            </a-select>
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
  import { getQueryString } from '@/libs/util'

  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }

  @Component({
    components: {}
  })
  export default class dataOrinig extends Vue {
    @Mutation changeOpenKeys: any

    loading:boolean = true
    visible:boolean = false // 控制模态框
    modelTitle:string = '生成模型'
    modelCol: object = { // 设置栅格比例
      label: {span: 8},
      wrapper: {span: 12}
    }
    columns: Array<object> = [
      {title: '编号', dataIndex: 'key'}, // fixed: 'left' 设置是否固定
      {title: '标识', dataIndex: 'name'},
      {title: '名称', dataIndex: 'title'},
      {title: '创建时间', dataIndex: 'create_time'},
      {title: '状态', dataIndex: 'status'},
      {title: '操作', dataIndex: '', width: '30%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
    ]
    data: Array<object> = [] // 表格内容数据
    selectedRowKeys:Array<string> = [] // 存放表格选中的数据key
    selectedRows:Array<object> = [] // 存放选中的表格的数据
    reportId: any = '' // 从数据源页带过来的id
    dbDataTabSelect:Array<string> = [] // 数据表
    selectDisabled:boolean = false // 数据表下拉框是否禁用
    modelId:string = '' // 判断是新增或是编辑
    editDataEcho:object = {}
    delBtnLoading:boolean = false
    pagination:pagination = {
      current: 1,
      pageSize: 10,
      total: 1
    }

    beforeCreate () { // 挂载前创建ant form
      (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
    }
    mounted () {
      this.reportId = getQueryString('reportId') || '';
      let params: any = { report_source_id: this.reportId, pageSize: 10, nowpage: 1 }
      this.initDataFun(params) // 请求表格数据
      this.initDbTabFun() // 请求数据表接口方法
    }
    initDataFun (params:any) {
      this.loading = true;
      (this as any).$get('/custom/Modelcon/modelList', params).then((res: any) => { // 请求表格数据
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
    initDbTabFun ():void {
      (this as any).$get('/custom/Modelcon/getTables', { report_source_id: this.reportId }).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          this.dbDataTabSelect = res.data;
        } else {
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
      }).catch(() => {
        (this as any).$message.error('数据表请求失败', 3);
      });
    }
    // 表格选中与否改变事件
    onSelectChange (selectedRowKeys:Array<string>, selectedRows:Array<object>):void {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    }
    onChange (pagination: any) {
      const pager:any = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager
      let params: object = { report_source_id: this.reportId, nowpage: pagination.current, pageSize: pagination.pageSize }
      this.initDataFun(params);
    }
    showModel ():void { // 模态框
      this.visible = true
    }
    handleCancel ():void { // 隐藏模态框
      this.visible = false;
      this.selectDisabled = false; // 模态框隐藏时将其重置
      this.editDataEcho = {};
      (this as any).modelForm.resetFields(); // 重置输入控件的值
    }
    handleCreate (e: any):void { // 点击模态框确认方法
      e.preventDefault();
      (this as any).modelForm.validateFields((err: any, values: any) => {
        if (!err) {
          let params: any = values;
          if (!this.modelId) { // 新增
            params.report_source_id = this.reportId;
            const url:string = '/custom/Modelcon/generate';
            this.addEditModelFun(params, url)
          } else {
            params.model_id = this.modelId;
            delete params.table // 去掉table
            const url:string = '/custom/Modelcon/doEdit';
            this.addEditModelFun(params, url)
          }
        }
      })
    }
    addEditModelFun (params:any, url: string) { // 新增编辑方法
      (this as any).$get(url, params).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          this.visible = !this.visible; // 隐藏模态框
          (this as any).$message.success(res.message, 3);
          (this as any).modelForm.resetFields(); // 清空表单
          console.log(this.pagination)
          let par: object = { report_source_id: this.reportId, nowpage: this.pagination.current, pageSize: this.pagination.pageSize }
          this.initDataFun(par);
        } else {
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
      });
    }
    filterOption (input: any, option: any) { // select框搜索方法
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    editFun (event: any, record: any): void { // 编辑方法
      this.visible = !this.visible; // 将模态框显示
      this.modelId = record.id;
      this.editDataEcho = record; // 将信息带过来回显
      this.selectDisabled = true
      console.log(this.editDataEcho)
    }
    go (e: any, record: any): void {
      e.preventDefault();
      // (this as any).changeOpenKeys({ openKeys: '2' }); // 设置要打开的key，如果是子节点则取其父key
      // window.open(window.location.origin + '/statementManagement'); // 加上参数_target 表示只打开一个，重复点击会回到第一个打开的窗口
      (this as any).$router.push({ path: '/fieldManagement' }) // 字段管理
    }
    deleteFun (e: any, record: any):void { // 删除方法
      e.preventDefault();
      this.delBtnLoading = !this.delBtnLoading
      let params: object = { model_id: record.id, type: 'del' };
      this.changeStateFun(params);
    }
    changeState ():void { // 启用 ，禁用方法
      console.log(this.selectedRows)
    }
    changeStateFun (params: object):void { // 改变状态方法
      (this as any).$get('custom/Modelcon/ChangeStatus', params).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          let par: object = { report_source_id: this.reportId, nowpage: this.pagination.current, pageSize: this.pagination.pageSize }
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
    // 计算属性方法，必须有返回值
    get hasSelected ():boolean {
      return this.selectedRowKeys.length > 0
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
