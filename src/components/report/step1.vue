<template>
  <div>
    <a-form style="max-width: 800px; margin: 40px auto 0;" :form="form">
      <a-form-item label='报表名称' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-input
          ref="reportName"
          v-decorator="['reportName', { rules: [{ required: true, message: '请输入报表名称' }]}]"
          placeholder="报表名称"
        />
      </a-form-item>
      <a-form-item label="数据源" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-select
          ref="reportResourceId"
          @change="dataSourceSelectChange"
          v-decorator="['reportResourceId', { rules: [{ required: true, message: '请选择数据源' }]}]"
          placeholder="请选择数据源"
        >
          <a-select-option value="">请选择数据源</a-select-option>
          <a-select-option v-for="(item, i) in dataSourceList" :value="item.report_source_id" :key="i">{{item.link_name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="数据主表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-select
          ref="mainTableId"
          :disabled="selectDisabled"
          @change="mainTableIdChange"
          placeholder="数据主表"
          v-decorator="['mainTableId', { initialValue: '', rules: [{ required: true, message: '请选择数据主表' }]}]"
        >
          <a-select-option value="">请选择数据主表</a-select-option>
          <a-select-option v-for="(item, i) in dataTab" :value="item.id" :key="i">{{item.title}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关联表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
        <a-button type="primary" :disabled="joinBtnDis" @click="showModel" ref="joinArr"> + </a-button>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 15, offset: 5}">
        <template v-for="(item, i) in aTagDatas">
          <a-tag :key="i" :closable="(i+1) === aTagDatas.length" :afterClose="() => aTagClose(i)" color="blue">关联主表：{{item.mainTableId}}</a-tag>
        </template>
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
      @ok="handleCreate">
      <a-form ref="collectionForm" :form="modelForm">
        <a-form-item label="关联表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-select 
            ref="joinTableId"
            @change="joinTableIdSelectChange"
            v-decorator="['joinTableId', { rules: [{ required: true, message: '请选择关联表' }]}]"
            placeholder="选择关联表">
            <a-select-option value="">选择关联表</a-select-option>
            <a-select-option v-for="(item, i) in dataTab" :value="item.id" :key="i">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关联字段" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-select 
            ref="joinFieldId"
            :disabled="joinTabFiledSelectDis"
            v-decorator="['joinFieldId', { rules: [{ required: true, message: '请选择字段' }]}]"
            placeholder="选择关联表字段">
            <a-select-option value="">选择关联表字段</a-select-option>
            <a-select-option v-for="(item, i) in joinMainFieldIds" :value="item.id" :key="i">{{item.field_name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="数据主表" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <!-- <a-input :defaultValue="dataTabVal" ref="dataTabVal"/> -->
          <a-select 
            ref="mainTableIdModel"
            v-decorator="['mainTableId', { rules: [{ required: true, message: '请选择字段' }]}]"
            placeholder="数据主表">
            <a-select-option value="">请选择数据主表</a-select-option>
            <a-select-option v-for="(item, i) in mainTableIdModel" :value="item.id" :key="i">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="主表字段" :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
          <a-select 
            ref="mainFieldId"
            :disabled="joinTabFiledSelectDis"
            v-decorator="['mainFieldId', { rules: [{ required: true, message: '请选择主表字段' }]}]"
            placeholder="选择主表字段">
            <a-select-option value="">选择主表字段</a-select-option>
            <a-select-option v-for="(item, i) in joinMainFieldIds" :value="item.id" :key="i">{{item.field_name}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

 @Component
 export default class sterp1 extends Vue {
    @Prop() dataSourceList: any // 从父组件接收数据源

    modelCol: object = {
      label: {span: 5},
      wrapper: {span: 15}
    }
    selectDisabled:boolean = true // 数据主表是否可选
    joinTabFiledSelectDis:boolean = true // 关联字段、主表字段是否可选
    dataTab:Array<any> = [] // 存放根据数据源请求来的数据主表和弹窗中的关联表
    aTagDatas:Array<any> = [] // 存储关联表
    joinArr:Array<object> =[] // 存储关联表
    visible:boolean = false // 控制模态框
    
    joinBtnDis:boolean = true // 关联表+按钮
    mainTabIdsArr:Array<number> = [] // 存放数据主表选中的id
    madinTabId:number = 0 // 选中的数据主表id
    mainTableIdModel:Array<object> = [] // 存放带入到弹窗数据主表中回显的内容
    joinMainFieldIds:Array<object> = [] // 存放关联字段、主表字段
    reportId:string = ''
    @Emit('reportId')

    beforeCreate () { // 挂载前创建ant form
      (this as any).form = (this as any).$form.createForm(this); // 定义搜索form
      (this as any).modelForm = (this as any).$form.createForm(this); // 定义modalform
    }
    created () {}
    dataSourceSelectChange (val:string):void { // 数据源下拉框改变事件
      this.selectDisabled = false
      if (val) {
        (this as any).$post('custom/Modelcon/getModelBySourceId', { report_source_id: val }).then((res: any) => { // 请求表格数据
          if (res.state === 2000) {
            // this.selectDisabled = false
            this.dataTab = res.data
          } else {
            this.dataTab = [];
            (this as any).$message.error(res.message, 3); // 弹出错误message
          }
        }).catch((err: any) => {
          console.log(err);
          this.dataTab = [];
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        });
      }
    }
    mainTableIdChange (val:number):void { // 数据主表下拉框改变事件
      if (val) {
        this.joinBtnDis = false
        this.madinTabId = val // 替换数据主表id
        /* if (this.mainTabIdsArr.indexOf(val) === -1) { // 如果其中不包含其中选中的，则push
          this.mainTabIdsArr.push(val)
        } */
      } else {
        this.joinBtnDis = true
      }
    }
    joinTableIdSelectChange (val:number):void { // 关联表改变事件
      this.joinTabFiledSelectDis = false
      if (val) {
        (this as any).$get('custom/Attribute/getFileldsByModelId', { model_id: val }).then((res: any) => { // 请求表格数据
          if (res.state === 2000) {
            this.joinMainFieldIds = res.data
          } else {
            this.joinMainFieldIds = [];
            (this as any).$message.error(res.message, 3); // 弹出错误message
          }
        }).catch((err: any) => {
          console.log(err);
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        });
      }
    }
    aTagClose (v:any):void { // 关联表tag关闭后回调
      const tags = this.aTagDatas.filter((tag:any) => tag.mainTableId !== this.aTagDatas[v].mainTableId)
      this.aTagDatas = tags;
      this.joinArr.pop() // 删掉最后一个
    }
    nextStep ():void { // 下一步
      (this as any).form.validateFields((err: any, values: any) => {
        if (!err) {
          values.joinArr = this.joinArr;
          (this as any).$post('custom/ReportManage/saveStepOne', values).then((res: any) => { // 请求表格数据
            if (res.state === 2000) {
              this.reportId = res.data.reportId
              this.$emit('reportId', this.reportId)
              this.$emit('nextStep')
            } else {
              (this as any).$message.error(res.message, 3); // 弹出错误message
            }
          }).catch((err: any) => {
            console.log(err);
            (this as any).$message.error('请求失败', 3); // 弹出错误message
          });
        }
      })
    }
    showModel ():void { // 模态框
      this.visible = true
      this.dataTab.forEach((v, i) => { // 处理附带数据主表 数据
        if (v.id === this.madinTabId) { // 相同给的则不带过去
          if (JSON.stringify(this.mainTableIdModel).indexOf(JSON.stringify(v)) === -1) {
            this.mainTableIdModel.push(v)
          }
        }
      })
     // console.log(this.mainTableIdModel)
    }
    handleCancel ():void {
      this.visible = false;
      this.joinTabFiledSelectDis = true; // 将字段选择重置为不可选
      (this as any).modelForm.resetFields(); // 重置输入控件的值
    }
    handleCreate (e: any):void { // 模态框点击确认
      e.preventDefault();
      (this as any).modelForm.validateFields((err: any, values: any) => {
        if (!err) {
          console.log(values);
          this.joinArr.push(values); // 存放进要提交的
          this.aTagDatas.push(values); // 存放进要回显的
          this.joinTabFiledSelectDis = true; // 将字段选择重置为不可选
          (this as any).modelForm.resetFields();
          this.visible = false
        }
      })
    }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
</style>
