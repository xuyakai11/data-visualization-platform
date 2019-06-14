<template>
  <div class="config">
    <a-table
        :scroll="{ x: x, y: y }"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        @change="onChange"
        maskClosable="false"
        :loading="loading"
        :rowKey="record => record.keyFlagId"
        size="small" />
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  interface pagination {
    current:number,
    pageSize:number,
    total:number
  }
  @Component({
    components: {}
  })
  export default class configTable extends Vue {
    @Prop({}) paramsData!:any
    @Prop({}) styles!:any

    columns: Array<object> = [ // 定义表格表头
      /* { title: '账号', dataIndex: 'login_name', key: '', width: '120px' }, // fixed: 'left' 设置是否固定
      { title: '姓名', dataIndex: 'name', key: '' },
      { title: 'EHR员工编号', dataIndex: 'EHR_code', key: '', width: '120px' },
      { title: '邮箱', dataIndex: 'email', key: '' },
      { title: '手机', dataIndex: 'mobile', key: '' },
      { title: '固定电话', dataIndex: 'phone', key: '', width: '180px' },
      { title: '学校', dataIndex: 'school_name', key: '' },
      { title: '校区', dataIndex: 'area_name', key: '' },
      { title: '停用日期', dataIndex: 'modify_times', key: '', width: '110px' },
      { title: '状态', dataIndex: 'statetxt', key: '' } */
    ]
    pagination:pagination = { // 定义分页数据
      current: 1,
      pageSize: 10,
      total: 1
    }

    loading:boolean = true
    data:Array<any> = []
    y:number = 140
    x:number = 1500
    @Watch('styles') patintingWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        this.y = newVal.parentHeight - 180
      }
    }
    @Watch('paramsData') paramsDataWatch (newVal:any, oldVal:any) {
      if (newVal && JSON.stringify(newVal) !== '{}') {
        console.log(newVal)
        let params:any = {
          'reportId': newVal.selected_rows.report_id,
          'pageSize': 10,
          'nowpage': 1,
          'searchParam': ''
        }
        this.initDataFun(params)
      }
    }
    mounted () {
      let params:any = { 'reportId': this.paramsData.selected_rows.report_id, 'searchParam': '', pageSize: 10, nowpage: 1 }
      this.initDataFun(params) // 请求表格数据
    }
    initDataFun (params:any):void {
      (this as any).$post('custom/Report/getReportDetail', params).then((res: any) => { // 请求表格数据
       if (res.state === 2000) {
         this.loading = false
         this.columns = res.data.columns
         this.x = this.columns.length * 250
         // console.log(this.x)
         this.data = res.data.data
         this.data.map((v:any, i:number) => {
           v.keyFlagId = i
         })
         const pagination = { ...this.pagination }
         pagination.total = res.data.count
         this.pagination = pagination
       } else {
         this.loading = false;
         this.data = [];
         (this as any).$message.error(res.message, 3); // 弹出错误message
       }
     }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
       this.loading = false
       this.data = []
     })
    }
    onChange (pagination:any):void {
      const pager:any = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      let obj = { 'reportId': this.paramsData.selected_rows.report_id, 'searchParam': '', nowpage: pagination.current, pageSize: pagination.pageSize }
      this.initDataFun(obj)
    }
  }
</script>

<style lang='less' scoped>
.config {
  height: 100%;
  width: 100%;
  padding: 10px;
  .map {
    height: 100%;
    width: 100%;
  }
}
</style>
