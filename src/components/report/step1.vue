<template>
  <div>
    <a-form style="max-width: 800px; margin: 40px auto 0;" :form="form">
      <a-form-item label='报表名称' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-input
          ref="dataName"
          v-decorator="['dataName', { rules: [{ required: true, message: '请输入连接名' }]}]"
          placeholder="报表名称"
        />
      </a-form-item>
      <a-form-item label="数据源" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-select placeholder="选择数据源">
          <a-select-option value="">选择数据源</a-select-option>
          <a-select-option value="1">朴新CRM</a-select-option>
          <a-select-option value="2">朴新ERP</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据主表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-input
          ref="dataTab"
          v-decorator="['dataTab', { rules: [{ required: true, message: '请输入连接名' }]}]"
          placeholder="数据主表"
        />
      </a-form-item>
      <a-form-item label="关联表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-button type="primary" @click="showModel"> + </a-button>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 15, offset: 5}">
        <a-tag v-for="item in aTagDatas" closable color="blue">{{item.name}}</a-tag>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 15, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>

    <!-- 弹窗层 -->
    <a-modal
      :visible="visible"
      title='新增关联表'
      okText='确认'
      cancelText='取消'
      @cancel="handleCancel"
      @ok="handleCreate"
    >
      <a-form layout='vertical' ref="collectionForm" :form="modalForm">
        <a-form-item label="关联表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-select 
            ref="assTab"
            v-decorator="['assTab', { rules: [{ required: true, message: '请选择关联表' }]}]"
            placeholder="选择关联表">
            <a-select-option value="">选择关联表</a-select-option>
            <a-select-option value="1">班级扩展表</a-select-option>
            <a-select-option value="2">订单主表</a-select-option>
            <a-select-option value="3">行课记录表</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关联字段" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-select 
            ref="assTabStr"
            v-decorator="['assTabStr', { rules: [{ required: true, message: '请选择字段' }]}]"
            placeholder="选择关联表字段">
            <a-select-option value="">选择关联表字段</a-select-option>
            <a-select-option value="1">班级编码</a-select-option>
            <a-select-option value="2">订单编码</a-select-option>
            <a-select-option value="3">课次编码</a-select-option>
            <a-select-option value="4">行课日期</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="数据主表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-input :defaultValue="dataTabVal" ref="dataTabVal"/>
        </a-form-item>
        <a-form-item label="主表字段" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-select 
            ref="assMainTabStr"
            v-decorator="['assMainTabStr', { rules: [{ required: true, message: '请选择主表字段' }]}]"
            placeholder="选择关联表字段">
            <a-select-option value="">选择关联表字段</a-select-option>
            <a-select-option value="1">班级编码</a-select-option>
            <a-select-option value="2">订单编码</a-select-option>
            <a-select-option value="3">课次编码</a-select-option>
            <a-select-option value="4">行课日期</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class sterp1 extends Vue {
    modelCol: object = {
      label: {span: 5},
      wrapper: {span: 15}
    }
    aTagDatas:Array<object> = [
      { name: '很长的一段描述表的文字', id: '1'},
      { name: '很长的一段描述表的文字2', id: '2'}
    ]
    visible:boolean = false // 控制模态框
    dataTabVal:string = '订单扩展表'

    beforeCreate () { // 挂载前创建ant form
      (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
      (this as any).modalForm = (this as any).$form.createForm(this); // 定义modalform
    }

    nextStep ():void {
      this.$emit('nextStep')
    }
    showModel ():void { // 模态框
      this.visible = true
    }
    handleCancel ():void {
      this.visible = false
    }
    handleCreate (e: any):void { // 模态框点击确认
      e.preventDefault();
      (this as any).modalForm.validateFields((err: any, values: any) => {
        if (!err) {
          console.log(values);
          (this as any).modalForm.resetFields();
          this.visible = false
        }
      })
    }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
</style>
