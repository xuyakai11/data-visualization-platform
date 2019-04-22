<template>
  <div>
    <a-card title="角色管理" :bordered="false"></a-card>
    <div class="rolemanageList">
      <a-form layout='inline' class="ant-advanced-search-from" :form="form">
        <a-form-item :span="24">
          <a-input
            ref="roleName"
            v-decorator="['roleName']"
            placeholder="角色名称" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch" :loading="searchLoading">搜索</a-button>
        </a-form-item>
      </a-form> 
      <div class="operation">
        <a-row>
          <a-col :span="24" :style="{ textAling: 'right'}">
            <a-button type="primary" htmlType="button" @click="addfn">新增</a-button>
          </a-col>
        </a-row>
      </div>  
      <div class="search-result-list">
        <a-table :scroll="{x: true}" :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="onChange" :loading="loading" :rowKey="record => record.id">
          <span slot="action">
            <a-button type="primary" size="small">编辑</a-button>
            <a-divider type="vertical" />
            <a-button type="primary" size="small">查看</a-button>
            <a-divider type="vertical" />
            <a-button type="primary" size="small">停用</a-button>
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
  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
  @Component
  export default class roleManagement extends Vue {
    pagination:pagination = { // 定义分页数据
      current: 1,
      pageSize: 10,
      total: 1
    }
    loading:boolean = true // 初始化显示loading加载动画
    data: Array<any> = [] // 定义表格内容
    columns: Array<any> = [ // 定义表格表头
      {title: '角色名称', dataIndex: 'name'}, // fixed: 'left' 设置是否固定
      {title: '角色描述', dataIndex: 'description'},
      {title: '操作', dataIndex: '', width: '40%', scopedSlots: { customRender: 'action'}} // scopedSlots配置操作列
    ]
    searchLoading: boolean = false;
    beforeCreate () {
      (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
      (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
    }
    mounted () {
      /* let testConnectDatas:any = (this as any).form.getFieldsValue();
      console.log(testConnectDatas) */
      let roleName:string = (this as any).$refs.roleName.value || ''; // 角色名
      let params:any = { roleName: roleName, pageSize: 10, nowpage: 1 }
      this.initDataFun(params); // 请求表格数据
    }
    initDataFun (params: any):void {
      (this as any).$post('custom/RoleManage/getRoleManageList', params).then((res: any) => { // 请求表格数据
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
    handleSearch ():void {
      let roleName:string = (this as any).$refs.roleName.value || ''; // 角色名
      let params:any = { roleName: roleName, pageSize: 10, nowpage: 1 }
      this.initDataFun(params); // 请求表格数据
    }
    onChange (pagination: any):void {
      const pager:any = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager
      let roleName:string = (this as any).$refs.roleName.value || ''; // 角色名
      let params:any = { roleName: roleName, nowpage: pagination.current, pageSize: pagination.pageSize }
      this.initDataFun(params); // 请求表格数据
    }
    addfn ():void {
      window.open(window.location.origin + '/roleManagementAdd'); // _target 表示只打开一个，重复点击会回到第一个打开的窗口
    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
.rolemanageList{
  margin:10px;
  .rolemanageSet{
    border-radius: 0 0 6px 6px;
    background-color: #fafafa;
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
