<template>
<div>
  <a-card title="报表管理" :bordered="false"></a-card>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-from" @submit="handleSearch" :form="form">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item >
            <a-input
              v-decorator="['linkName']"
              placeholder="搜索条件" />
          </a-form-item>
        </a-col>
        <a-col :span="6" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="submit">搜索</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="operation">
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" @click="go">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="search-result-list">
      <a-table :columns="columns" :dataSource="data" bordered>
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :data-type="record.key" @click="editFun($event)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small">添加入菜单</a-button>
        </span>
      </a-table>
    </div>
  </div>
</div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import axios from 'axios';
  import { interfaces } from 'mocha';
  import { State, Mutation } from 'vuex-class'

  interface axiosDatas {
    linkName: string,
    adress: string
  }

  const dataSource: Array<object> = [{ key: 'gg', name: 'sadf', address: 'asdfbbbb', age: 'awwwww' }]
  for (let i = 0; i < 46; i++) {
    dataSource.push({
      key: i,
      name: `名字${i}`,
      address: `链接地址¥${i}`,
      age: `ggg${i}`,
      text: `<span>asdf</span>`
    })
  }

 @Component({
   components: {}
 })
 export default class dataOrinig extends Vue {
  @Prop() private msg!: string;
  @Mutation changeOpenKeys: any

  loading: boolean = true
  modelCol: object = {
    label: {span: 8},
    wrapper: {span: 12}
  }

  columns: Array<object> = [
    {title: '链接名', dataIndex: 'address', key: 'address', width: '15%'}, // fixed: 'left' 设置是否固定
    {title: '数据库地址', dataIndex: 'age', key: 'age', width: '25%'},
    {title: '账号名', dataIndex: 'name', key: 'name', width: '20%'},
    {title: '操作', dataIndex: '', key: '', width: '40%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
  ]
  data: Array<object> = dataSource

  beforeCreate () { // 挂载前创建ant form
    (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
    (this as any).modalForm = (this as any).$form.createForm(this); // 定义modalform
  }

  handleSearch (e: any):void { // 搜索方法
    e.preventDefault();
    (this as any).form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('values', values)
      }
    })
  }
  go (e: any):void { // 打开报表制作页
    // window.open(window.location.origin + '/statementMake'); // statementManagement _target 表示只打开一个，重复点击会回到第一个打开的窗口
    (this as any).$router.push({ 'path': '/statementMake' });
  }
  testLinkFun (e: any):void { // 测试链接方法
    e.preventDefault();
  }
  editFun (event: any): void { // 编辑方法
    let type: string = event.target.getAttribute('data-type');
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
/* 模态框样式 */
.ant-form-item-label {
  text-align: right;
  vertical-align: middle;
  line-height: 39.999px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}
.ant-form-item-label {
  label :after {
    content: ':';
    margin: 0 8px 0 2px;
    position: relative;
    top: -.5px;
  }
}
</style>
