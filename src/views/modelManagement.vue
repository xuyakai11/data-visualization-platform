<template>
<div>
  <a-card title="模型管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button">启用</a-button>
          <a-button type="primary" htmlType="button">禁用</a-button>
          <a-button type="primary" htmlType="button">生成</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 表格 -->
    <div class="search-result-list">
      <a-table :columns="columns" :dataSource="data" bordered :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :data-type="record.key">禁用</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" :data-type="record.key" @click="editFun($event)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="go">字段管理</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small">删除</a-button>
        </span>
      </a-table>
    </div>
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

  const dataSource: Array<object> = [{ key: 'gg', name: 'sadf', address: 'asdfbbbb', age: 'awwwww' }]
  for (let i = 0; i < 46; i++) {
    dataSource.push({
      key: `多选框选中key${i}`,
      name: `名字${i}`,
      time: `时间${i}`,
      state: `状态${i}`,
      text: `<span>asdf</span>`
    })
  }

 @Component({
   components: {}
 })
 export default class dataOrinig extends Vue {
  @Prop() private msg!: string;
  @Mutation changeOpenKeys: any

  loading:boolean = true
  visible:boolean = false // 控制模态框
  modelCol: object = {
    label: {span: 8},
    wrapper: {span: 12}
  }
  columns: Array<object> = [
    {title: '编号', dataIndex: 'key', key: ''}, // fixed: 'left' 设置是否固定
    {title: '标识', dataIndex: 'name', key: ''},
    {title: '创建时间', dataIndex: 'time', key: ''},
    {title: '状态', dataIndex: 'state', key: ''},
    {title: '操作', dataIndex: '', key: '', width: '30%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
  ]
  data: Array<object> = dataSource
  selectedRowKeys:Array<string> = [] // 存放表格选中的数据

  beforeCreate () { // 挂载前创建ant form
    (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
    (this as any).modalForm = (this as any).$form.createForm(this); // 定义modalform
  }
  created () {}

  handleSearch (e: any):void { // 搜索方法
    e.preventDefault();
    (this as any).form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('values', values)
      }
    })
  }
  showModel () { // 模态框
    this.visible = true
  }
  handleCancel () {
    this.visible = false
  }
  handleCreate (e: any):void {
    e.preventDefault();
    /* const form: any = this.$refs.collectionForm.form */
    (this as any).modalForm.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values);
        (this as any).modalForm.resetFields();
        this.visible = false
      }
    })
  }
  editFun (event: any): void { // 编辑方法
    console.log(event.target.getAttribute('data-type'));
    this.showModel(); // 将模态框
    let type: string = event.target.getAttribute('data-type');
  }
  go (e: any): void {
    e.preventDefault();
    // (this as any).changeOpenKeys({ openKeys: '2' }); // 设置要打开的key，如果是子节点则取其父key
    // window.open(window.location.origin + '/statementManagement'); // 加上参数_target 表示只打开一个，重复点击会回到第一个打开的窗口
    (this as any).$router.push({ path: '/fieldManagement' })
  }
  onSelectChange (selectedRowKeys: any):void {
    console.log(selectedRowKeys)
    this.selectedRowKeys = selectedRowKeys
  }
  // 计算属性方法，必须有返回值
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
