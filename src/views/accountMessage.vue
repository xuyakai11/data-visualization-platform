
<template>
  <div>
    <a-card :title="title" :bordered="false"></a-card>
    <a-spin :spinning="spinning" delayTime="500">
      <div class="accountMessage">
        <a-form :form="form" layout='horizontal'>
          <a-row :gutter="22">
            <a-col :span="8">
              <a-form-item v-bind="formInputSelectlayout" label="姓名">
                <a-input
                  :disabled="commonDisabled"
                  v-decorator="['name', { initialValue: data.userInfo.name, rules: [{ required: true, message: '请输入姓名' }] }]"
                  placeholder="请输入姓名">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="性别">
                <a-radio-group :disabled="commonDisabled" v-decorator="['gender', { initialValue: data.userInfo.gender }]">
                  <a-radio value="0"> 男 </a-radio>
                  <a-radio value="1"> 女 </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="账号">
                <a-input v-decorator="['login_name', { initialValue: data.userInfo.login_name, rules: [{ required: true, message: '请输入账号!' }] }]"
                  :disabled="commonDisabled"
                  placeholder="账号">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- <a-row :gutter="22">
            <a-col :span="8">
              <a-form-item v-bind="formInputSelectlayout" label="密码">
                <a-input type="password"
                  :disabled="commonDisabled"
                  v-decorator="['password', { rules: [{ required: false, message: '请输入密码' }] }]"
                  placeholder="请输入密码">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="邮箱">
                <a-input v-decorator="['email', { initialValue: data.userInfo.email, rules: [{ type: 'email', message: '邮箱格式不正确！' }, { required: false, message: '请输入邮箱' }] }]"
                  :disabled="allDisabled"
                  placeholder="邮箱">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="企业邮箱">
                <a-input v-decorator="['qiyeEmail', { rules: [{ type: 'email', message: '邮箱格式不正确！' }, { required: false, message: '请输入企业邮箱' }] }]"
                  :disabled="allDisabled"
                  placeholder="企业邮箱">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="22">
            <a-col :span="8">
              <a-form-item v-bind="formInputSelectlayout" label="手机号码">
                <a-input v-decorator="['mobile', { initialValue: data.userInfo.mobile, rules: [{ required: false, message: '请输入手机号码' }] }]"
                  :disabled="allDisabled"
                  placeholder="手机号码">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="微信号码">
                <a-input v-decorator="['wechat', { initialValue: data.userInfo.Wechat, rules: [{ required: false, message: '请输入微信号码' }] }]"
                  :disabled="commonDisabled"
                  placeholder="微信号码">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="22">
            <a-col :span="8">
              <a-form-item v-bind="formInputSelectlayout" label="所属部门" >
                <a-select
                  :disabled="allDisabled"
                  v-decorator="[ 'departmentCode', { initialValue: data.userInfo.department_code, rules: [{ required: true, message: '请选择所属部门' }] }]"
                  placeholder="请选择所属部门">
                  <a-select-option value="">所属部门</a-select-option>
                  <a-select-option :value="item.Code" v-for="(item, i) in data.department" :key="i">
                    {{item.Name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="所属校区" >
                <a-select
                  :disabled="allDisabled"
                  v-decorator="[ 'areaId', { initialValue: data.userInfo.area_code, rules: [{ required: false, message: '请选择所属校区,不能为空' }] }]"
                  placeholder="请选择所属校区">
                  <a-select-option value="">所属校区</a-select-option>
                  <a-select-option :value="list.Code" v-for="(list, index) in data.areaList" :key="index">
                    {{list.Name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item v-bind="formInputSelectlayout" label="入职日期">
                <a-date-picker :disabled="commonDisabled" format="YYYY-MM-DD" v-decorator="[ 'hireDate', { initialValue: data.userInfo.hire_date, rules: [{ required: true, message: '请选择入职时间' }] }]" style="100%"/>
             </a-form-item>
            </a-col>
          </a-row> -->

          <a-form-item v-bind="formItemLayout" label="系统角色">
            <a-checkbox-group
              :disabled="allDisabled"
              v-decorator="['roleId', { initialValue: roleInfoDealWith, rules: [{ required: true, message: '请选择系统角色' }]  }]"
              style="width: 100%;" >
              <a-row>
                <a-col :span="4" v-for="(item, index) in data.roleList" :key="index">
                  <a-checkbox :value="item.id">
                    <a-tooltip placement="topLeft" :title="item.name" arrowPointAtCenter>
                      {{item.name}}
                    </a-tooltip>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
          <!-- <a-form-item v-bind="formItemLayout" label="岗位角色">
            <a-checkbox-group
              :disabled="allDisabled"
              v-decorator="['positionRoleCode', { initialValue: data.userInfo.position_role_codes, rules: [{ required: false, message: '请选择岗位角色' }] }]"
              style="width: 100%;" >
              <a-row>
                <a-col :span="4" v-for="(item, key, index) in data.positionRoleCode" >
                  <a-checkbox :value="key">
                    <a-tooltip placement="topLeft" :title="item" arrowPointAtCenter>
                      {{item}}
                    </a-tooltip>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item> -->
          <!-- <a-form-item v-bind="formItemLayout" label="校区权限">
            <a-checkbox
              :disabled="allDisabled"
              :indeterminate="indeterminate"
              @change="onCheckAllChange"
              :checked="checkAll" >
              全选
            </a-checkbox>
            <a-checkbox-group
              :disabled="allDisabled"
              v-model="checkedList"
              @change="onChange"
              style="width: 100%;" >
              <a-row>
                <a-col :span="4" v-for="(list, index) in data.areaList" :key="index">
                  <a-checkbox :value="list.Code">
                    <a-tooltip placement="topLeft" :title="list.Name" arrowPointAtCenter>
                      {{list.Name}}
                    </a-tooltip>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item> -->
          <!-- <a-form-item v-bind="formItemLayout" label="条线">
            <a-checkbox-group
              :disabled="allDisabled"
              v-decorator="['businessLineCodes', { initialValue: data.userInfo.business_line_codes }]"
              style="width: 100%;" >
              <a-row>
                <a-col :span="4" v-for="(item, index) in data.businessLineCodes" :key="index">
                  <a-checkbox :value="item">
                    {{item}}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item> -->

          <!-- <a-form-item v-bind="formItemLayout" label="工作性质">
            <a-radio-group :disabled="allDisabled" v-decorator="['stuffType', { initialValue: data.userInfo.stuff_type }]">
              <a-radio value="0">
                兼职
              </a-radio>
              <a-radio value="1">
                全职
              </a-radio>
            </a-radio-group>
          </a-form-item> -->
          <!-- <a-form-item v-bind="formItemLayout" label="EHR员工编号">
            <a-input v-decorator="['EHR_code', { initialValue: data.userInfo.EHR_code, rules: [{ required: false, message: '请输入ehr员工编号' }] }]"
              :disabled="commonDisabled"
              placeholder="ehr员工编号">
            </a-input>
          </a-form-item> -->
          <!-- <a-form-item v-bind="formItemLayout" label="办公电话">
            <div class="lpc-onlineForm">
              <a-row :gutter="24">
                <a-col :span="4">
                  <a-form-item>
                    <a-input v-decorator="['phone_qu', { rules: [{ required: false, message: '请输入办公电话区号' }] }]"
                      :disabled="allDisabled"
                      placeholder="区号">
                    </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <a-form-item>
                    <a-input v-decorator="['phone_hao', { initialValue: data.userInfo.phone, rules: [{ required: false, message: '请输入办公电话号码' }] }]"
                      :disabled="allDisabled"
                      placeholder="号码">
                    </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-form-item>
                    <a-input v-decorator="['phone_fen', { rules: [{ required: false, message: '请输入办公电话编号' }] }]"
                      :disabled="allDisabled"
                      placeholder="分机">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-form-item> -->
          <!-- <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-input-group compact>
              <a-select style="width: 10%"
                :disabled="allDisabled"
                v-decorator="['idCardType', { initialValue: data.userInfo.id_card_type, rules: [{ required: false, message: '请选择证件类型' }] }]">
                <a-select-option value="">无</a-select-option>
                <a-select-option value="0">身份证</a-select-option>
                <a-select-option value="1">学生证</a-select-option>
                <a-select-option value="2">护照</a-select-option>
              </a-select>
              <a-input :disabled="allDisabled" style="width: 50%" v-decorator="['idCardCode', { initialValue: data.userInfo.id_card_code, rules: [{ required: false, message: '请输入证件号码' }] }]"/>
            </a-input-group>
          </a-form-item> -->
          <!-- <a-form-item label="呼叫中心" v-bind="formItemLayout">
            <div class="lpc-formDivform">
              <a-form-item label="工号" v-bind="formDIvform">
                <a-input :disabled="allDisabled" v-decorator="['ccIdNumber', { initialValue: data.userInfo.cc_id_number, rules: [{ required: false, message: '请输入工号' }] }]"
                  placeholder="工号">
                </a-input>
              </a-form-item>
              <a-form-item label="分机号" v-bind="formDIvform">
                <a-input :disabled="allDisabled" v-decorator="['ccTelExtension', { initialValue: data.userInfo.cc_tel_extension, rules: [{ required: false, message: '请输入分机号' }] }]"
                  placeholder="分机号">
                </a-input>
              </a-form-item>
              <a-form-item label="分机密码" v-bind="formDIvform">
                <a-input :disabled="allDisabled" v-decorator="['ccPassword', { initialValue: data.userInfo.cc_password, rules: [{ required: false, message: '请输入分机密码' }] }]"
                  placeholder="分机密码">
                </a-input>
              </a-form-item>
            </div>
          </a-form-item> -->
          <a-form-item style="text-align: center;padding: 20px 0;">
            <a-button type="primary" v-if="type === 'edit'" html-type="submit" @click="handleSubmit">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { getQueryString } from '@/libs/util.ts'
  import * as moment from 'moment'
  interface formItemLayout {
    labelCol:any,
    wrapperCol:any
  }
  interface data {
    areaInfo: Array<any>,
    areaList:Array<any>,
    businessLineCodes:Array<string>,
    idCardType:Array<string>,
    positionRoleCode:any,
    roleInfo:Array<any>,
    roleList:Array<any>,
    state:Array<string>,
    stuffType:Array<string>,
    userInfo:any,
    department:Array<any>
  }
  @Component
  export default class accountMessage extends Vue {
    userId:string = '' // 账号列表也带过来的id
    type:string = '' // 列表页带过的type，判断是编辑or查看
    title:string = '账号信息' // title
    commonDisabled:boolean = true // 编辑or查看页共同都是禁用
    allDisabled:boolean = false // 全部禁用
    data:data = {
      areaInfo: [],
      areaList: [], // 校区权限
      businessLineCodes: [], // 条线
      department: [], // 所属部门
      idCardType: [], // 证件类型
      positionRoleCode: {},
      roleInfo: [], // 回显选中系统角色
      roleList: [], // 系统角色
      state: [],
      stuffType: [],
      userInfo: {} // 个人信息
    }
    indeterminate:boolean = true // 设置全选
    checkAll:boolean = false // 全选判断
    checkedList:Array<string> = [] // 校区权限选中的数据
    areaList:Array<string> =[] // 设置全选时的选中数据
    roleInfoDealWith:Array<string> = [] // data.roleInfo处理后回显的数据
    spinning:Boolean = true
    formItemLayout:formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    formInputSelectlayout:formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
    formDIvform:formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 }
    }
    moment () {}
    beforeCreate () {
      (this as any).form = (this as any).$form.createForm(this);
    }
    created () {
      this.userId = getQueryString('userId')
      this.type = getQueryString('type')
      this.initDataFun({ userId: this.userId })
    }
    mounted () {
      this.title = this.type === 'edit' ? '编辑账号信息' : '查看账号信息'
      this.type === 'look' ? this.allDisabled = true : this.allDisabled = false
    }
    initDataFun (params:any):void {
      (this as any).$post('/custom/UserManage/getEditUserInfo', params).then((res: any) => { // 请求页面数据
        if (res.state === 2000) {
          this.data = res.data
          this.roleInfoDealWith = res.data.roleInfo.length ? res.data.roleInfo.map((v:any, i:number) => { // 处理要回显的数据
            return v.id
          }) : []
          /* this.data.userInfo.business_line_codes ? this.data.userInfo.business_line_codes.split(',') : this.data.userInfo.business_line_codes = []
          this.data.userInfo.position_role_codes ? this.data.userInfo.position_role_codes.split(',') : this.data.userInfo.position_role_codes = [] */
          this.data.userInfo.hire_date = this.data.userInfo.hire_date ? this.data.userInfo.hire_date = null : (this as any).moment(this.data.userInfo.hire_date, 'YYYY-MM-DD')
          this.data.userInfo.gender = this.data.userInfo.gender.toString() // 将返回过来的性别字段转为字符串格式
          /* this.checkedList = this.data.areaInfo // 赋值默认选中的校区权限
          this.areaList = this.data.areaList.length ? this.data.areaList.map((v:any, i:number) => {
            return v.Code
          }) : [] */ // 设置获取全选时的选中
          this.spinning = false;
        } else {
          this.spinning = false;
          (this as any).$message.error(res.message, 3) // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3) // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3) // 弹出错误message
        }
        this.spinning = false
        this.data = {
          areaInfo: [],
          areaList: [],
          businessLineCodes: [],
          department: [],
          idCardType: [],
          positionRoleCode: {},
          roleInfo: [],
          roleList: [],
          state: [],
          stuffType: [],
          userInfo: {}
        }
      })
    }
    onCheckAllChange (e:any):void { // 校区权限 全选按钮方法
      Object.assign(this, {
        checkedList: e.target.checked ? this.areaList : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    }
    onChange ():void { // 校区权限 单个选择方法
      this.indeterminate = !!this.checkedList.length && (this.checkedList.length < this.areaList.length)
      this.checkAll = this.checkedList.length === this.areaList.length
    }
    handleSubmit (e:any):void { // 提交方法
      e.preventDefault();
      (this as any).form.validateFieldsAndScroll((err: any, values: any) => {
        if (!err) {
          values.businessLineCodes = values.businessLineCodes.join(',')
          values.positionRoleCode = values.positionRoleCode.join(',')
          values.roleId = values.roleId.join(',')
          values.phone = values.phone_qu + values.phone_hao + values.phone_fen
          delete values.EHR_code
          delete values.phone_fen
          delete values.phone_qu
          delete values.phone_hao
          let params:any = {
            ...values,
            'hireDate': values['hireDate'].format('YYYY-MM-DD'),
            'userId': this.userId
          };
          (this as any).$post('/custom/UserManage/updateUserInfo', params).then((res: any) => { // 请求页面数据
            if (res.state === 2000) {
              (this as any).$message.success(res.message, 3);
              setTimeout(() => {
                (this as any).$router.push({ path: '/accountManagement' }) 
                // window.location.href = window.location.origin + '/roleManagement' // 
              }, 1000)
            } else {
              (this as any).$message.error(res.message, 3) // 弹出错误message
            }
          }).catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
              (this as any).$message.error('请求超时', 3) // 弹出错误message
            } else {
              (this as any).$message.error('请求失败', 3) // 弹出错误message
            }
          })
        }
      })
    }
  }
</script>

<style lang='less' scoped>
.accountMessage {
  margin: 10px;
  background: #fbfbfb;
  .ant-form {
    max-width: none;
    padding-top: 24px;
    .lpc-onlineForm {
      .ant-form-item {
        margin-bottom: 0;
      }
    }
    .lpc-formDivform {
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      padding-top: 10px;
    }
    .ant-row {
      .ant-checkbox-group {
        .ant-checkbox-wrapper { // 复选框
          margin: 10px 0;
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
