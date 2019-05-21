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
          <a-tag color="#108ee9"><a-icon type="plus" />添加组件</a-tag>
          <a-tag ><a-icon type="setting" /></a-tag>
          <a-tag color="#87d068">完成</a-tag>
        </div>
      </header>
      <section>
        <div class="dashboardView">
          <div class="layout-container">
            <div class="gutter-example">
              <a-row :gutter="8"> <!-- gutter配置间隔 -->
                <a-col class="gutter-row" :span="2" v-for="(item, index) in 12" :key="index">
                  <div class="gutter-box"></div>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
      </section>
    <!-- <router-view></router-view> -->
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class customConfigReport extends Vue {
    spinning:boolean = true
    titleName:string = '报表名称'
    titleNameEdit:boolean = false // 配置报表名称修改
    cancelTitleNameFlag:string = '' // 用于取消还原修改

    created () {

    }
    mounted () {
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    }
    /* 报表名称 修改方法 start */
    titleNameEditFun (e:string) { // 报表名称修改方法
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
.gutter-box {
  background: #00A0E9;
  padding: 5px 0;
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
    }
  }
  section {
    width: 100%;
    height: 100%;
    /* position: relative;
    top: 49px; */
    background-color: #FFF;
    .dashboardView {
      height: 100%;
      width: 100%;
      overflow: visible;
      .layout-container {
        padding: 5px;
        .gutter-example {
          border: 1px solid red;
        }
      }
    }
  }
</style>
