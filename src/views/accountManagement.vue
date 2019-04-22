<template>
  <div>
    <a-card title="账号管理" :bordered="false"></a-card>
    <a-spin :spinning="spinning" delayTime="500">
      <div class="account" id="components-form-demo-advanced-search">
        <a-form layout='inline' class="ant-advanced-search-from" :form="form">
          <!-- <a-row :gutter="24">
            <a-col :span="8">
            </a-col>
          </a-row> -->
          <a-form-item>
            <a-input
              ref="loginName"
              v-decorator="['loginName', { initialValue: '', rules: [{ required: false, message: '请输入报表名称' }]}]"
              placeholder="账号"/>
          </a-form-item>
          <a-form-item>
            <a-input
              ref="userName"
              v-decorator="['userName', { initialValue: '', rules: [{ required: false, message: '请输入姓名' }]}]"
              placeholder="姓名"/>
          </a-form-item>
          <a-form-item>
            <a-input
              ref="ehrCode"
              v-decorator="['ehrCode', { initialValue: '', rules: [{ required: false, message: '请输入编号' }]}]"
              placeholder="编号"/>
          </a-form-item>
          <a-form-item>
            <a-input
              ref="roleName"
              v-decorator="['roleName', { initialValue: '', rules: [{ required: false, message: '请输入系统角色' }]}]"
              placeholder="系统角色"/>
          </a-form-item>
          <a-form-item>
            <a-select
              style="width: 171px;"
              placeholder="岗位角色"
              v-decorator="['positionRoleCode', { initialValue: '', rules: [{ required: false, message: '请输入岗位角色' }]}]"
              >
              <a-select-option value="">岗位角色</a-select-option>
              <a-select-option v-for="(item, key, i) in positionRoleCode" :value="key" :key="i">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              style="width: 171px;"
              placeholder="状态"
              v-decorator="['state', { initialValue: '', rules: [{ required: false, message: '请输入状态' }]}]"
            >
              <a-select-option value="">状态</a-select-option>
              <a-select-option v-for="(item, i) in state" :value="i" :key="i">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              style="width: 171px;"
              placeholder="部门"
              v-decorator="['department', { initialValue: '', rules: [{ required: false, message: '请输入部门' }]}]"
            >
              <a-select-option value="">部门</a-select-option>
              <a-select-option v-for="(item,i) in department" :key="i" :value="item.Code">{{item.Name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select
              style="width: 171px;"
              placeholder="编制"
              v-decorator="['stuffType', { initialValue: '', rules: [{ required: false, message: '请输入编制' }]}]"  
            >
              <a-select-option value="">编制</a-select-option>
              <a-select-option v-for="(item, i) in stuffType" :value="i" :key="i">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSearch" :loading="searchLoading">搜索</a-button>
          </a-form-item>
        </a-form>
        <div class="operation">
        </div>
        <div class="search-result-list">
          <a-table :scroll="{x: true}" :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="onChange" :loading="loading" :rowKey="record => record.id">
            <span slot="action" slot-scope="text, record">
              <a-button type="primary" size="small" :loading="lookLoading" @click="go($event, record.id, 'look')">查看</a-button>
              <a-divider type="vertical" />
              <a-button type="primary" size="small" :loading="editLoading" @click="go($event, record.id, 'edit')">编辑</a-button>
              <a-divider type="vertical" />
              <a-button type="primary" size="small" @click="openReportScreen">绑定账号</a-button>
            </span>
          </a-table>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
  @Component
  export default class accountManageement extends Vue {
    spinning:Boolean = true // 页面初始化蒙板
    lookLoading:Boolean = false // 查看loading
    editLoading:Boolean = false // 编辑按钮loading
    loading:Boolean = false // table loading
    searchLoading:Boolean = false // 搜索按钮loading
    department:Array<any> = [] // 搜索条件部门
    positionRoleCode:any = {} // 搜索条件岗位角色
    state:Array<string> =[] // 搜索条件状态
    stuffType:Array<string> = [] // 搜索条件编制
    data:any =[]
    columns: Array<object> = [ // 定义表格表头
      { title: '账号', dataIndex: 'login_name', key: '' }, // fixed: 'left' 设置是否固定
      { title: '姓名', dataIndex: 'name', key: '' },
      { title: 'EHR员工编号', dataIndex: 'EHR_code', key: '', width: '120px' },
      { title: '邮箱', dataIndex: 'email', key: '' },
      { title: '手机', dataIndex: 'mobile', key: '' },
      { title: '固定电话', dataIndex: 'phone', key: '' },
      { title: '学校', dataIndex: 'school_name', key: '' },
      { title: '部门', dataIndex: 'departName', key: '' },
      { title: '校区', dataIndex: 'area_name', key: '' },
      { title: '编制', dataIndex: 'stufftxt', key: '' },
      { title: '停用日期', dataIndex: 'modify_times', key: '', width: '110px' },
      { title: '状态', dataIndex: 'statetxt', key: '' },
      { title: '操作', dataIndex: '', key: '', width: '20%', scopedSlots: { customRender: 'action'} } // scopedSlots配置操作列
    ]
    pagination:pagination = { // 定义分页数据
      current: 1,
      pageSize: 10,
      total: 1
    }
    openReportScreen () {
      window.open(window.location.origin + '/reportScreen') // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    }
    beforeCreate () {
      (this as any).form = (this as any).$form.createForm(this);
    }
    created () {
    }
    mounted () {
      this.initSearchSelectData();
      (this as any).form.validateFields((err: any, values: any) => {
        this.initDataFun(values) // 请求表格数据
      })
    }
    initSearchSelectData ():void { // 获取select数据
      (this as any).$post('/custom/UserManage/searchConditionInfo', null).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          this.spinning = false // 关闭加载动画
          this.department = res.data.department
          this.positionRoleCode = res.data.positionRoleCode
          this.state = res.data.state
          this.stuffType = res.data.stuffType
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
        this.spinning = false;
        this.data = [];
      })
    }
    initDataFun (params:any):void {
      (this as any).$post('/custom/UserManage/getUserManageList', params).then((res: any) => { // 请求表格数据
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
      (this as any).form.validateFields((err: any, values: any) => {
        this.initDataFun(values)
      })
    }
    onChange (pagination: any) {
      const pager:any = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      (this as any).form.validateFields((err: any, values: any) => {
        if (err) {
          (this as any).$message.error('表单信息有误', 3) // 弹出错误message
        }
        console.log('sdfsfsdf')
        let obj = { nowpage: pagination.current, pageSize: pagination.pageSize, ...values }
        console.log(obj)
        this.initDataFun(obj)
      })
    }
    filterOption (input:any, option:any):boolean { // 搜索框输入搜索 过滤方法
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    go (e:any, id:string, type:string): void {
      e.preventDefault()
      let userId = id // 账号id
      // 打开账号编辑详情
      window.open(window.location.origin + '/accountMessage?userId=' + userId + '&type=' + type) // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
.account {
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
    border-radius: 0 0 6px 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding: 10px;
  }
}
</style>
