<template>
  <div class="dataOrigin" id="components-form-demo-advanced-search">
    <!-- <a-card :bordered="false" :loading="loading">
      <a-form layout='inline' @submit="handleSubmit" :form="form">
        <a-form-item></a-form-item>
      </a-form>
    </a-card> -->
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
      <a-row>
        <a-col :span="24" :style="{ textAling: 'right'}">
          <a-button type="primary" htmlType="button" @click="showModal">新增</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
      <!-- <data-table :datas="dataSource" :columnsData="columns"></data-table> -->
      <a-table :columns="columns" :dataSource="data" bordered>
      <!-- <a slot="tags" slot-scope="text" href="javascript:void(0);">action</a> -->
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" size="small" :data-type="record.key" @click="editFun($event)">编辑</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small" @click="go">报表列表</a-button>
          <a-divider type="vertical" />
          <a-button type="primary" size="small">抽取规则</a-button>
        </span>
      </a-table>
    </div>
    <!-- 弹窗层 -->
    <a-modal
        :visible="visible"
        title='新建数据源'
        okText='确认'
        cancelText='取消'
        @cancel="handleCancel"
        @ok="handleCreate"
      >
        <a-form layout='vertical' ref="collectionForm" :form="modalForm">
          <a-form-item label='连接名' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="linkName"
              v-decorator="['linkName', { rules: [{ required: true, message: '请输入连接名' }]}]"
              placeholder="连接名"
            />
          </a-form-item>
          <a-form-item label='数据库地址' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              ref="dataAdress"
              v-decorator="['dataAdress', { rules: [{ required: true, message: '请输入数据库地址' }]}]"
              placeholder="数据库地址"
            />
          </a-form-item>
          <a-form-item label='端口号' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              v-decorator="['portNum', { rules: [{ required: true, message: '请输入端口号' }]}]"
              placeholder="端口号"
            />
          </a-form-item>
          <a-form-item label='数据库账号' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              v-decorator="['dataUser', { rules: [{ required: true, message: '请输入数据库账号' }]}]"
              placeholder="数据库账号"
            />
          </a-form-item>
          <a-form-item label='账号密码' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
            <a-input
              v-decorator="['dataPassword', { rules: [{ required: true, message: '请输入数据库密码' }]}]"
              placeholder="账号密码"
            />
          </a-form-item>
          <a-form-item :wrapperCol="{span: 12, offset: 8}">
            <a-button type="primary" @click="testLinkFun">测试链接</a-button>
          </a-form-item>
          <!-- <a-form-item label='Description'>
            <a-input
              type='textarea'
              v-decorator="['description']"
            />
          </a-form-item>
          <a-form-item class='collection-create-form_last-form-item'>
            <a-radio-group
              v-decorator="[
                'modifier',
                {
                  initialValue: 'private',
                }
              ]"
            >
                <a-radio value='public'>Public</a-radio>
                <a-radio value='private'>Private</a-radio>
              </a-radio-group>
          </a-form-item> -->
        </a-form>
      </a-modal>
  </div>
  
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import axios from 'axios';
  import { interfaces } from 'mocha';

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
  loading: boolean = true
  visible:boolean = false // 控制模态框
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
  created () {}

  handleSearch (e: any):void { // 搜索方法
    e.preventDefault();
    (this as any).form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('values', values)
      }
    })
  }
  showModal () { // 模态框
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
  testLinkFun (e: any):void { // 测试链接方法
    e.preventDefault();
    let linkName: string = (this as any).$refs.linkName.value;
    let address: string = (this as any).$refs.dataAdress.value;
    console.log(linkName, address);
    axios.post('/user', {
      firstName: linkName,
      lastName: address
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch((res: any) => {
      console.log(res);
      (this as any).$message.success('链接成功！', ['3'], () => {console.log(1)}); // text, 自动关闭时间， 回调
      (this as any).$message.error('链接成功！');
      (this as any).$message.warning('链接成功！');
    });
  }
  editFun (event: any): void { // 编辑方法
    console.log(event.target.getAttribute('data-type'))
    let type: string = event.target.getAttribute('data-type');
  }
  go (e: any): void {
    e.preventDefault();
    window.open(window.location.origin + '/statementMake', '_target');
    // (this as any).$router.push({ path: '/statementManagement' })
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
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
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
