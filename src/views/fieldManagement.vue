<template>
<div>
  <a-card title="模型管理/字段管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 表格 -->
    <div class="search-result-list">
      <a-table :columns="columns" :dataSource="data" bordered :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :data-type="record.key" @click="editFun($event)">编辑</a-button>
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
      filed: `字段${i}`,
      type: `类型${i}`
    })
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
    {title: '编号', dataIndex: 'key', key: ''}, // fixed: 'left' 设置是否固定
    {title: '字段', dataIndex: 'filed', key: ''},
    {title: '名称', dataIndex: 'name', key: ''},
    {title: '数据类型', dataIndex: 'type', key: ''},
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
  onSelectChange (selectedRowKeys: any):void {
    console.log(selectedRowKeys)
    this.selectedRowKeys = selectedRowKeys
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
