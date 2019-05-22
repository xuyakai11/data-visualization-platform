<template>
  <div>
    <a-spin :spinning="spinning" delayTime="500">
      <header>
        <div class="header-left">
          <a-input ref="titleName" v-if="titleNameEdit" :value="titleName" @change="e => titleNameEditFun(e.target.value)" style="width: 200px;"/>
          <template v-else>{{titleName}}</template>
          <div v-if="!titleNameEdit" class="header-icon">
            <a-icon type="edit" @click="editTitleName"></a-icon>
          </div>
          <div v-else class="header-icon">
            <a-icon type="check" @click="saveEditTitleName"></a-icon>
            <a-icon type="close" @click="cancelEditTitleName"></a-icon>
          </div>
        </div>
        <div class="header-right">
          <a-tag color="#108ee9" @click="addReportModal"><a-icon type="plus" />添加组件</a-tag>
          <a-tag @click="showDrawer"><a-icon type="setting"/></a-tag>
          <a-tag color="#87d068">完成</a-tag>
        </div>
      </header>
      <section>
        <a-drawer
          title="属性设置"
          placement="right"
          :closable="false"
          @close="onClose"
          :visible="visible"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-drawer>
        <div class="dashboardView">
          <div class="layout-container" ref="layout">
            <div class="gutter-example" >
              <a-row :gutter="8" v-for="(item, index) in row"> <!-- gutter配置间隔 -->
                <a-col class="gutter-row" :span="2" v-for="(item, i) in 12" :key="i">
                  <div class="gutter-box"></div>
                </a-col>
              </a-row>
            </div>
            <div class="lpc-canvas">
              <div class="lpc-report">
                <config-report></config-report>
              </div>
            </div>
          </div>
        </div>
      </section>
    <!-- <router-view></router-view> -->
    </a-spin>
    <!-- 弹窗层 -->
    <a-modal
      :visible="addReportModalVisible"
      title="选择报表"
      okText='确认'
      cancelText='取消'
      @cancel="handleCancel"
      @ok="handleCreate"
      :okButtonProps="{props: {disabled: modalBtn} }"
    >
      <a-form layout='inline' class="ant-advanced-search-from" :form="modelForm">
        <a-form-item :span="24">
          <a-input
            ref="reportName"
            v-decorator="['reportName']"
            placeholder="报表名称" />
        </a-form-item>
        <a-form-item :span="24">
          <a-input
            ref="sourceName"
            v-decorator="['sourceName']"
            placeholder="数据源名称" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch" :loading="searchLoading">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import configReport from './configReport.vue'

  @Component({
    components: { configReport }
  })
  export default class customConfigReport extends Vue {
    spinning:boolean = true
    titleName:string = '报表名称'
    titleNameEdit:boolean = false // 配置报表名称修改
    cancelTitleNameFlag:string = '' // 用于取消还原修改
    visible:boolean = false // 抽屉
    row:number = 0
    addReportModalVisible:boolean = false // 添加组件弹窗
    modalBtn:boolean = true // modal确认按钮控制
    addReportId:string = '' // 添加组件时选中的reportid
    searchLoading:boolean = false // modal中搜索按钮动画

    beforeCreate () {
      (this as any).modelForm = (this as any).$form.createForm(this) // 定义modelform
    }
    created () {

    }
    mounted () {
      let clientHeight:any = document.body.offsetHeight - 49
      console.log(clientHeight / 30);
      this.row = Math.ceil(clientHeight / 30) // 向上取整
      // ((this as any).$refs.layout as HTMLDivElement).style.height = clientHeight + 'px';
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    }

    /* modal 弹窗start */
    addReportModal ():void { // 添加组件 弹出modal方法
      this.addReportModalVisible = true
    }
    handleCancel ():void { // 隐藏模态框
      this.addReportModalVisible = false
      this.modalBtn = true
      this.addReportId = ''; // 每次关闭模态框都将其id重置为空
      (this as any).modelForm.resetFields(); // 重置输入控件的值
    }
    handleCreate ():void {

    }
    handleSearch (e: any):void { // 添加组件modal中搜索方法
      e.preventDefault();
      let sourceName:string = (this as any).$refs.sourceName.value || ''; // 连接名
      let reportName:string = (this as any).$refs.reportName.value || ''; // 报表名
      let params:any = { reportName: reportName, sourceName: sourceName, pageSize: 10, nowpage: 1 }
      // this.initDataFun(params); // 请求表格数据
    }
    /* modal 弹窗end */

    /* 抽屉start */
    showDrawer ():void {
      this.visible = true
    }
    onClose ():void {
      this.visible = false
    }
    /* 抽屉end */

    /* 报表名称 修改方法 start */
    titleNameEditFun (e:string):void { // 报表名称修改方法
      this.titleName = e // 将输入的赋值给其名称
    }
    editTitleName ():void { // 点击修改按钮方法
      this.titleNameEdit = true
      this.cancelTitleNameFlag = this.titleName // 获取titleName作为flag用于取消还原
    }
    saveEditTitleName ():void { // 保存修改
      this.titleNameEdit = false
    }
    cancelEditTitleName ():void { // 取消还原修改
      this.titleNameEdit = false
      this.titleName = this.cancelTitleNameFlag // 取消时将之前的titleName还原
    }
    /* 报表名称 修改方法 end */
  }
</script>

<style scoped>
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-example >>> .ant-row {
  margin-bottom: 5px;
}
.gutter-example >>> .ant-row:last-child {
  margin-bottom: 0px;
}
.gutter-box {
  background: #00a0e921;
  padding: 5px 0;
  height: 25px;
}
</style>

<style lang='less' scoped>
  header {
    line-height: 48px;
    background-color: #fafafa;
    border-bottom: 1px solid #d9d9d9;
    .header-left {
      display: inline-block;
      margin-left: 30px;
      .header-icon {
        display: inline-block;
        margin-left: 10px;
        font-size: 15px;
        .anticon-edit {
          color: #1dd9e2c7;
          cursor: pointer;
        }
        .anticon-check {
          color: #3fb54b;
          cursor: pointer;
          margin-right: 5px;
        }
        .anticon-close {
          color: #e84545;
          cursor: pointer;
        }
      }
    }
    .header-right {
      float: right;
      margin-right: 20px;
      margin-left: 10px;
      .anticon-plus {
        margin-right: 5px;
      }
    }
  }
  section {
    width: 100%;
    height: 100%;
    /* position: relative;
    top: 49px; */
    background-color: rgb(242, 246, 250);
    .dashboardView {
      height: 100%;
      width: 100%;
      overflow: visible;
      .layout-container {
        padding: 5px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        .gutter-example {
          
        }
        .lpc-canvas {
          position: absolute;
          border: 1px solid red;
          padding: 5px;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          .lpc-report {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
