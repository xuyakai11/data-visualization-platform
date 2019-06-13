<template>
<div>
  <a-card title="仪表盘管理" :bordered="false"></a-card>
  <div class="instrumentPanelMake" id="components-form-demo-advanced-search">
    <a-form layout='inline' class="ant-advanced-search-from" :form="form">
      <a-form-item :span="24">
        <a-input
          ref="boardName"
          v-decorator="['boardName']"
          placeholder="仪表盘名称" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch" :loading="searchLoading">搜索</a-button>
      </a-form-item>
    </a-form>
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" @click="go">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="search-result-list">
      <a-table :scroll="{x: true}" :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="onChange" :loading="loading" :rowKey="record => record.board_id">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" @click="go($event, record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="look($event, record)">查看</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" :loading="delBtnLoading" @click="deleteFun($event, record)">删除</a-button>
        </span>
      </a-table>
    </div>
  </div>
</div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
 @Component({
   components: {}
 })
 export default class instrumentPanelMake extends Vue {
  @Prop() private msg!: string;

  searchLoading:boolean = false // 搜索按钮加载效果
  loading:boolean = true // 初始化显示loading加载动画
  
  columns: Array<object> = [ // 定义表格表头
    {title: '仪表盘名称', dataIndex: 'board_name'}, // fixed: 'left' 设置是否固定
    {title: '数据源名称', dataIndex: 'resource_name'},
    {title: '报表名称', dataIndex: 'report_name'},
    {title: '操作', dataIndex: '', width: '40%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
  ]
  data: Array<object> = [] // 定义表格内容
  pagination:pagination = { // 定义分页数据
    current: 1,
    pageSize: 10,
    total: 1
  }
  delBtnLoading:boolean = false // 删除按钮加载

  beforeCreate () { // 挂载前创建ant form
    (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
    (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
  }
  mounted () {
    /* let testConnectDatas:any = (this as any).form.getFieldsValue();
    console.log(testConnectDatas) */
    let boardName:string = (this as any).$refs.boardName.value || ''; // 报表名
    let params:any = { boardName, pageSize: 10, nowpage: 1 }
    this.initDataFun(params); // 请求表格数据
  }
  initDataFun (params:any):void { // 初始化查询数据表方法
    (this as any).$post('/custom/BoardManage/getBoardList', params).then((res: any) => { // 请求表格数据
      if (res.state === 2000) {
        const pagination = { ...this.pagination }
        this.loading = false // 关闭加载动画
        pagination.total = res.data.count
        this.data = res.data.data
        this.pagination = pagination
      } else {
        this.loading = false;
        (this as any).$message.error(res.message, 3) // 弹出错误message
      }
    }).catch((err: any) => {
      if (err.code === 'ECONNABORTED') {
        (this as any).$message.error('请求超时', 3) // 弹出错误message
      } else {
        (this as any).$message.error('请求失败', 3) // 弹出错误message
      }
      this.loading = false
      this.data = []
    })
  }
  handleSearch (e: any):void { // 搜索方法
    e.preventDefault();
    let boardName:string = (this as any).$refs.boardName.value || ''; // 仪表盘名称
    let params:any = { boardName, pageSize: 10, nowpage: 1 }
    this.initDataFun(params); // 请求表格数据
  }
  
  go (e: any, record?: any): void { // 新增or编辑方法
    e.preventDefault();
    // 打开自定义页面
    if (record) {
       window.open(window.location.origin + '/config?viewType=edit&boardId=' + record.board_id)
    } else {
      window.open(window.location.origin + '/config?viewType=add')
    }
    // window.open(window.location.origin + '/config') // _target 表示只打开一个，重复点击会回到第一个打开的窗口
  }
  look (e:any, record:any):void { // 查看
    e.preventDefault();
    let reportId = record ? record.report_id : '' // 报表id
    window.open(window.location.origin + '/config?viewType=look&boardId=' + record.board_id) // _target 表示只打开一个，重复点击会回到第一个打开的窗口
  }
  onChange (pagination: any) { // table改变方法
    const pager:any = { ...this.pagination }
    pager.current = pagination.current
    this.pagination = pager
    let boardName:string = (this as any).$refs.boardName.value || '' // 仪表盘名称
    let params:any = { boardName, nowpage: pagination.current, pageSize: pagination.pageSize }
    this.initDataFun(params) // 请求表格数据
  }
  deleteFun (e:any, record:any):void { // 删除方法
    e.preventDefault()
    this.delBtnLoading = !this.delBtnLoading
    let params: object = { board_id: record.board_id }
    this.showConfirm('提示', '确认要删除该仪表盘么？', params)
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
    (this as any).$post('/custom/BoardManage/delBoardInfo', params).then((res: any) => { // 删除表格数据
      if (res.state === 2000) { // 成功之后重新请求刷新table数据
        let boardName:string = (this as any).$refs.boardName.value || '' // 仪表盘名称
        let params:any = { boardName, pageSize: 10, nowpage: 1 }
        this.initDataFun(params); // 请求表格数据
        (this as any).$message.success(res.message, 3)
        this.delBtnLoading = !this.delBtnLoading
      } else {
        this.delBtnLoading = !this.delBtnLoading;
        (this as any).$message.error(res.message, 3) // 弹出错误message
      }
    }).catch((err:any) => {
      if (err.code === 'ECONNABORTED') {
        (this as any).$message.error('请求超时', 3) // 弹出错误message
      } else {
        (this as any).$message.error('删除失败', 3)
      }
      this.delBtnLoading = !this.delBtnLoading
    })
  }
 }
</script>
<style lang='less' scoped>
.ant-card-head-title {
  font-weight: bolder;
}
.instrumentPanelMake {
  margin: 10px;
  .ant-form {
    max-width: none;
  }
  .ant-advanced-search-from {
    padding: 16px;
    background: #fbfbfb;
    border-radius: 6px 6px 0 0;
  }
  .operation {
    padding: 10px 10px;
  }
  .search-result-list {
    border-radius: 0 0 6px 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding: 10px;
  }
}
</style>
