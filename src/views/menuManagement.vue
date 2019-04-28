<template>
  <div class="menumanage">
    <a-spin :spinning="spinning" delayTime="500">
    <a-row :gutter="8">
      <a-col :xs="24" :sm="24" :md="6" class="menuleft">
        <a-card
         title="菜单管理"
         :bodyStyle='{"padding-right":0,"padding-top":0}'
        >
          <div clas="lefttree" style="padding-top:24px;">
            <left-tree :dataSourceTree="dataSourceTree" @treeDblData="treeMsg"></left-tree>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="18">
        <a-card
          style="width:100%"
          :tabList="tabList"
          :activeTabKey="activeTitleKey"
          @tabChange='changeTab'
        >
          <div class="editMenu">
            <a-form id="collectionForm" :form="modelForm">
              <a-form-item label='菜单名' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
                <a-input
                  ref="menuName"
                  v-decorator="['menuName', { initialValue: modelFormDatas.name, rules: [{ required: true, message: '请输入菜单名' }]}]"
                  placeholder="菜单名"
                />
              </a-form-item>
              <a-form-item label='链接' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
                <a-input
                  ref="menuUrl"
                  v-decorator="['menuUrl', { initialValue: modelFormDatas.path, rules: [{ required: true, message: '请输入链接' }]}]"
                  placeholder="链接"
                />
              </a-form-item>
              <a-form-item label='所属系统' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
                <a-select
                  ref="systemName"
                  v-decorator="[ 'systemName', { initialValue: modelFormDatas.system_name, rules: [{ required: true, message: '请选择所属系统' }] }]"
                  placeholder="请选择所属系统">
                  <a-select-option value="">请选择所属系统</a-select-option>
                  <a-select-option v-for="(item, i) in systemName" :value="i" :key="i">{{item}}</a-select-option>
                </a-select>
              </a-form-item>      
              <a-form-item label='是否开启' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
                <a-checkbox :checked="isdisplay" @change="changeDisplay">是</a-checkbox>
              </a-form-item>   
              <a-form-item label='显示在菜单' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
                <a-checkbox :checked="isstatus" @change="changeStatus">显示</a-checkbox>
              </a-form-item>   
              <a-form-item label='可见学校' :labelCol="modelCol.label" :wrapperCol="modelCol.wrapper">
               <a-checkbox-group
                v-decorator="['validSchool', { initialValue: validSchool}]"
                style="width: 100%;" >
                <a-row>
                  <a-col :span="6" v-for="(item, index) in validSchoolList" :key="index">
                    <a-checkbox :value="index"> 
                      {{item}}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              </a-form-item>   
              <a-form-item :wrapperCol="{span: 12, offset: 4}">
                <a-button type="primary" @click="savefn">保存</a-button>
                <a-button @click="resetfn">重置</a-button>
                <a-button type="danger" @click="deleteMenufn" v-if="activeTitleKey==='edit'">删除</a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-card>
        <a-card title="菜单对应权限" :style="{ marginTop: '16px' }">
          <a href="#" slot="extra"><a-icon type="plus" @click="menuBtnAdd"/></a>
          <div class="menuLimit">
            <template v-for="(tag) in menuBtnCodes">
              <!-- <a-tooltip v-if="tag.name.length > 20" :key="index" :title="tag.name">
                <a-tag :key="tag.id" closable :afterClose="() => handleClose(tag)">
                  {{`${tag.name.slice(0, 20)}...`}}
                  <a-icon type="edit" />
                </a-tag>    
              </a-tooltip> -->
              <a-tag :key="tag.id" closable :afterClose="() => menulimitDelete(tag)">
                {{tag.name}}
                <a-icon type="edit" @click="menulimitChange(tag)"/>
              </a-tag>
            </template>
          </div>
        </a-card>
      </a-col>
    </a-row>
    </a-spin>
    <!-- 弹窗层 -->
    <a-modal
        :visible="visible"
        :title="modelTitle"
        okText='确认'
        cancelText='取消'
        @ok="confirmModal"
        @cancel="cancelModal"
      >
        <a-form :form="Form" id="collectionForm">
           <a-form-item label='按钮权限名'>
            <a-input
              ref="priName"
              v-decorator="['priName', { initialValue: limitFormDatas.name, rules: [{ required: true, message: '请输入按钮权限名' }]}]"
              placeholder="按钮权限名"
            />
          </a-form-item>
          <a-form-item label='按钮权限编码'>
            <a-input
              ref="priCode"
              v-decorator="['priCode', { initialValue: limitFormDatas.code, rules: [{ required: false, message: '请输入按钮权限名' }]}]"
              placeholder="按钮权限编码"
            />
          </a-form-item>           
        </a-form>
      </a-modal>
  </div>
</template>

<script lang='ts'>
  import  { Component, Prop, Vue } from 'vue-property-decorator'
  import leftTree from '@/components/menumanage/leftTree.vue'
   /* eslint-disable */
  interface treeObject {
    title: string;
    key: string;
    [propName: string]: any; // 可定义任意属性
  }
  @Component({
    components: { leftTree }
  })
  export default class menuManagement extends Vue {
    
    spinning: boolean = true // 进入页面缓冲动画
    treeId: number = 0; 
    tabList:  Array<object> = [{key:'edit',tab:'编辑菜单'},{key:'add',tab:'新增子菜单'}]
    activeTitleKey:string = 'edit'
    dataSourceTree: Array<object> = []
    modelTitle: string = '添加权限' // 模态框标题
    visible:boolean = false // 控制模态框
    modelFormDatas: object = {}
    copyFormDatas: object = {}  // 备份modelFormDatas
    limitFormDatas: object = {}  // 菜单权限数据
    copylimitdata:any = {}
    islimitAdd: boolean = true;  // 判断权限按钮是add还是edit
    systemName: object = {} // 所属系统
    validSchool: Array<string> = [] // 可见学校数据处理后回显的数据
    isdisplay: boolean = true
    isstatus: boolean = true;
    validSchoolList: object = {}   // 可见学校列表
    menuBtnCodes: Array<object> = [] // 菜单对应权限
    modelCol:object = { // 设置form表单的栅格比例
      label: {xs:{span:24},sm:{span:24},md:{span:4}},
      wrapper: {xs:{span:24},sm:{span:24},md:{span:12}}
    }
    beforeCreate () {
      // 创建modelForm
      (this as any).modelForm = (this as any).$form.createForm(this); // 定义modelform
      (this as any).Form = (this as any).$form.createForm(this); // 定义modelform
    }
    mounted () {
      this.createTreeData();
    }
    createTreeData () { // 获取tree的数据
      (this as any).$post('custom/menuManage/menuList').then((res: any) => { // 请求tree数据
        if (res.state === 2000) {         
          this.dataSourceTree = [{id: 0,key: 0, title: '总目录', scopedSlots: {title: 'title'}, children: res.data}];
          this.getEditMenuInfo(0);
        } else {
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
        this.spinning = false;
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
        this.spinning = false;
        this.dataSourceTree = [{id: 0,key: 0, title: '总目录', scopedSlots: {title: 'title'}, children: [] }];
      });
    }
    treeMsg ( treeId:number) { // 点击tree的时候，接收子组件lefttree传过来的值
      this.treeId = treeId;
      this.getEditMenuInfo(treeId);
    }
    getEditMenuInfo (treeId:number) { // 获取对应的菜单信息,渲染编辑菜单内容
      let menuId: string|number = treeId?treeId:'';
      (this as any).modelForm.resetFields(); // 清空表单
      (this as any).$post('custom/menuManage/getEditMenuInfo', {menuId: menuId}).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          if (this.activeTitleKey=== 'edit' && treeId) { // treeId存在的时候，会返回menuinfo           
            this.copyFormDatas = res.data.menuInfo;
            // 获取编辑菜单信息
            this.isdisplay = res.data.menuInfo.is_display===1?true:false;
            this.isstatus= res.data.menuInfo.status===1?true:false;
            this.modelFormDatas = res.data.menuInfo;
            // 获取菜单对应权限
            this.menuBtnCodes = res.data.menuBtnCodes;
            // 获取到可见学校的键值，用于回显
            this.validSchool = res.data.menuInfo.valid_school?res.data.menuInfo.valid_school.split(","):[];
          }else{
            this.modelFormDatas = {};
            (this as any).modelForm.resetFields(); // 清空表单
            this.validSchool = [];
            this.isdisplay = true;
            this.isstatus = true;
          }
          // 获取所属系统
          this.systemName = res.data.systemName;
          // 获取可见学校
          this.validSchoolList = res.data.validSchool;
        } else {
          this.modelFormDatas = {};
          this.validSchoolList = [];
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
      });
    }
    changeDisplay (e:any) {
      this.isdisplay = e.target.checked;
    }
    changeStatus (e:any) {
      this.isstatus = e.target.checked;
    }
    // 切换tab
    changeTab (key:any , type:any) {
      this.activeTitleKey = key;
      (this as any).modelForm.resetFields(); // 清空表单
      this.validSchool = [];
      if ( this.activeTitleKey === 'add' ) {
        this.modelFormDatas = {};
      } else {
        this.getEditMenuInfo(this.treeId);
      }
    }
    // 添加菜单按钮
    menuBtnAdd ():void {
      this.visible = true;
      this.islimitAdd = true;
      this.limitFormDatas = {};
    }
    // 编辑菜单按钮
    menulimitChange (tag:any) {
      this.visible = true;
      this.islimitAdd = false;
      // 赋值，回显
      this.limitFormDatas = tag;
      this.copylimitdata = tag;
    }
    // 删除菜单权限
    menulimitDelete (tag:any) {
      (this as any).$post('custom/menuManage/deleteMenuBtnCodeInfo', {priId: tag.id}).then((res: any) => {
        if (res.state === 2000) {
          (this as any).$message.success(res.message, 3);
        } else {
          (this as any).$message.error(res.message, 3);
        }
      }).catch((err:any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3)
        }
      });
    }
    // 确认弹框事件
    confirmModal () {   
      (this as any).Form.validateFields((err: any, values: any) => {
        if (!err) {
          let sendlimitData = (this as any).Form.getFieldsValue(['priName', 'priCode']);
          sendlimitData.type=this.islimitAdd?'add':'edit';
          if (this.islimitAdd) { // 如果添加
            sendlimitData.menuId = this.treeId?this.treeId:'';
          } else { // 编辑
            sendlimitData.priId = this.copylimitdata.id;
          }
          (this as any).$post('custom/menuManage/updateMenuBtnCodeInfo', sendlimitData).then((res: any) => {
            if (res.state === 2000) {
              (this as any).$message.success(res.message, 3);
            } else {
              (this as any).$message.error(res.message, 3);
            }
            (this as any).Form.resetFields(); // 清空表单
            this.limitFormDatas = {};
            this.visible = false;
            // 保存之后，重新刷新，获取菜单信息
            this.getEditMenuInfo(this.treeId);
          }).catch((err:any) => {
            if (err.code === 'ECONNABORTED') {
              (this as any).$message.error('请求超时', 3); // 弹出错误message
            } else {
              (this as any).$message.error('请求失败', 3)
            }
          });
        }
      })
    }
    // 取消弹框事件
    cancelModal () {
      (this as any).Form.resetFields(); // 清空表单
      this.limitFormDatas = {};
      this.visible = false;
    }
    // 保存菜单信息edit OR add
    savefn () {
      (this as any).modelForm.validateFields((err: any, values: any) => {
        if (!err) {
          // 获取值
          let sendmenuData = (this as any).modelForm.getFieldsValue(['menuName', 'menuUrl', 'systemName', 'status', 'validSchool']);
          sendmenuData.isDisplay = this.isdisplay?1:'';
          sendmenuData.status = this.isstatus?1:'';
          sendmenuData.menuId = this.treeId?this.treeId:'';
          sendmenuData.validSchool = sendmenuData.validSchool.length?sendmenuData.validSchool.join(","):"";
          let type:string;
          if (this.activeTitleKey === 'edit') {
            type = 'edit';
          } else {
            if (!this.treeId) {   
              type = 'add';
            } else {
              type = 'addSub';
            }
          }
          sendmenuData.type = type;
          (this as any).$post('custom/menuManage/updateMenuInfo', sendmenuData).then((res: any) => {
            if (res.state === 2000) {
              (this as any).$message.success(res.message, 3);
              this.createTreeData();             
            } else {
              (this as any).$message.error(res.message, 3);
            }
          }).catch((err:any) => {
            if (err.code === 'ECONNABORTED') {
              (this as any).$message.error('请求超时', 3); // 弹出错误message
            } else {
              (this as any).$message.error('请求失败', 3)
            }
          });
        }
      })
    }
    resetfn () {
      (this as any).modelForm.resetFields(); // 清空表单
      this.modelFormDatas = {};
      this.validSchool = [];
    }
    deleteMenufn () {
      (this as any).$post('custom/menuManage/deleteMenuInfo', {menuId: this.treeId}).then((res: any) => {
        if (res.state === 2000) {
          (this as any).$message.success(res.message, 3);
          this.createTreeData();   
          this.treeId = 0;      
        } else {
          (this as any).$message.error(res.message, 3);
        }
      }).catch((err:any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3)
        }
      });
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
.menumanage{
  margin:10px;
  .ant-form{
    .ant-checkbox-group{
      .ant-checkbox-wrapper{
        margin: 10px 0;
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .ant-btn{
      margin-right:8px;
    }
  }
  .menuLimit{
    .ant-tag{
      padding:0 12px !important;
      height:34px !important;
      line-height:34px !important;
      margin-bottom:10px;
    }
  }
  .menuleft{
    margin-bottom:8px; 
  }
}
</style>
