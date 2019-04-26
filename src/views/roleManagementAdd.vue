<template>
  <div>
    <a-card :title="'角色权限' + title" :bordered="false"></a-card>
    <a-spin :spinning="spinning" delayTime="500">
      <div class="rolemanageList">
        <a-form :form="form">
          <div class="lpc_role_header">
            <a-card title="角色基本信息">
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="角色名称">
                <a-input :disabled="lookDisabled"
                  v-decorator="['roleName', { initialValue: data.roleInfo.name, rules: [{ required: true, message: '请输入角色名称' }] }]"
                  placeholder="请输入角色名称">
                </a-input>
              </a-form-item>
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="角色描述">
                <a-textarea :disabled="lookDisabled"
                  v-decorator="['description', { initialValue: data.roleInfo.description, rules: [{ required: false, message: '请输入角色描述' }] }]"
                  placeholder="请输入角色描述">
                </a-textarea>
              </a-form-item>
            </a-card>
          </div>
          <div class="rolemanageSet">
            <table class="lpc-table-fixed">
              <thead class="lpc-table-thead">
                <tr>
                  <th>菜单权限</th>
                  <th>按钮权限</th>
                </tr>
              </thead>
              <tbody class="lpc-table-tbody">
                <tr>
                  <td>
                    <a-checkbox @change="allChangeMenu" :disabled="lookDisabled"> 全选 </a-checkbox> 
                    <span @click="allOpen">{{openText}}</span>
                  </td>
                  <td>
                    <a-checkbox @change="allChangeBtn" :disabled="lookDisabled"> 全选 </a-checkbox>
                  </td>
                </tr>
                <template v-for="(item, index) in menuList">
                  <tr class="lpc-parentTr" :key="index">
                    <td>
                      <a-checkbox :disabled="lookDisabled" :value="item.pid" :checked="item.isCheck" @change="itemMenuCheckboxChange($event, item)">{{item.pname}}</a-checkbox>
                      <span @click="toggleIcon(index)"><a-icon :type="item.open ? 'caret-down' : 'caret-right'" /></span><!-- caret-right -->
                    </td>
                    <td>
                      <a-checkbox :disabled="lookDisabled" @change="btnListAllCheck($event, item)" :checked="item.btnCheckbox">全选</a-checkbox>
                      <template v-if="item.btns.length > 0">
                        <a-checkbox :disabled="lookDisabled" v-for="(btn, ind) in item.btns" :vlaue="btn.pid" :checked="btn.isCheck" @change="parentMenuBtnChange($event, btn)">{{btn.pname}}</a-checkbox>
                      </template>
                    </td>
                  </tr>
                  <template v-if="item.subMenu.length > 0" >
                    <tr v-for="(list, i) in item.subMenu" v-if="item.open" class="lpc-children-tr">
                      <td><a-checkbox :disabled="lookDisabled" :value="list.pid" :checked="list.isCheck" @change="childMenuCheckboxChange($event, list, item)">{{list.pname}}</a-checkbox></td>
                      <td>
                        <a-checkbox :disabled="lookDisabled" @change="allListBtns($event, list)" :checked="list.btnCheckbox">全选</a-checkbox>
                        <a-checkbox :disabled="lookDisabled" v-for="(btn, ind) in list.btns" :value="btn.pid" :checked="btn.isCheck" @change="itemBtnCheckboxChange($event, btn)">{{btn.pname}}</a-checkbox>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr class="lpc-children-tr" v-if="item.open">
                      <td colspan="2">暂无数据</td>
                    </tr>
                  </template>
                </template>
                
              </tbody>
            </table>
            <!-- <template v-for="(item,key) in lists">
              <a-collapse :key="key" v-model="activeKey" @change="changeActivekey">
                <a-collapse-panel :key="key">
                  <template slot="header">
                      {{item.name}} | <a-checkbox> 全选</a-checkbox>
                  </template>
                  <a-row>
                    <a-col :span="3">
                      <ul>
                        <li>
                          <a-checkbox :checked="item.ischeck == true" @change="checkAll($event, item)">
                            全选
                          </a-checkbox>
                        </li>
                        <li v-for="(childrends,secondkey,secondindex) in item.subMenu" :key="secondindex">
                          <a-checkbox :checked="childrends.ischeck == true" @change="onChange($event, childrends, item)">{{childrends.name}}</a-checkbox>
                        </li>
                      </ul>
                    </a-col>
                    <a-col :span="21">
                      <ul>
                        <li>
                          <a-checkbox @change="checkbtnWhole($event,item)">
                            全选
                          </a-checkbox>
                        </li>
                        <li v-for="(againchildrend,secondkey,secondindex) in item.subMenu" :key="secondindex">
                          <div v-if="!againchildrend.btns.length">
                            <a-checkbox>
                            全选
                            </a-checkbox>
                          </div>
                          <div v-else>
                            <a-checkbox :checked="returnBtnCheck(againchildrend.btns)" @change="checkbtnAll($event,againchildrend.btns)">
                            全选
                            </a-checkbox>
                            <a-checkbox v-for="lastchildren in againchildrend.btns" :key="lastchildren.id" :checked="lastchildren.ischeck == true" @change="perbtnChange($event,lastchildren)">{{lastchildren.pname}}</a-checkbox>
                          </div>
                        </li>
                      </ul>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </template> -->
          </div>
          <a-form-item style="text-align: center;margin: 20px 0;" v-if="type !== 'look'">
            <a-button type="primary" @click="handleSubmit">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { getQueryString } from '@/libs/util.ts'

  interface formItemLayout {
    labelCol:any,
    wrapperCol:any
  }
  interface data {
    allMenu: any,
    roleInfo: any
  }
  @Component
  export default class roleManagementAdd extends Vue {
    spinning:boolean = true
    data: data = { // 定义页面数据
      allMenu: {},
      roleInfo: {}
    }
    menuList:Array<any> = [] // 菜单权限数据 将对象处理后的数据
    lists: any = {}
    activeKey: string[] = []
    getarr: Array<string> = ["1"]
    type:string = getQueryString('type') // 判断字段
    title:string = ''
    roleId:string = '' // 角色id
    disabledEdit:boolean = false // 控制是否能编辑字段
    formInputSelectlayout:formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 }
    }
    openText:string = '全部收缩'
    allCheckbox:Array<string> = [] // 最后提交的所有的id集合
    lookDisabled:boolean = false // 查看时禁用

    beforeCreate () {
      (this as any).form = (this as any).$form.createForm(this);
    }
    created () {
      this.roleId = getQueryString('roleId')
      let url:string = '/custom/RoleManage/getEditRoleInfo';
      if (this.type === 'edit') {
        this.title = '编辑'
        this.initDataFun(url, { roleId: this.roleId })
      } else if (this.type === 'add') {
        url = '/custom/RoleManage/getMenuInfo'
        this.title = '新增'
        this.initDataFun(url, null)
      } else if (this.type === 'look') {
        this.title = '查看'
        this.lookDisabled = true
        this.initDataFun(url, { roleId: this.roleId })
      }
    }
    initDataFun (url:string, params:any):void { // 初始化请求数据接口
      (this as any).$post(url, params).then((res: any) => { // 请求页面数据
        if (res.state === 2000) {
          this.data = res.data
          if (this.type === 'add') {
            this.data.roleInfo = {
              description: '',
              name: ''
            }
          }
          // console.log(Object.values(this.data))
          this.menuList = Object.values(this.data.allMenu) // 将权限模块数据转成数组对象格式
          this.menuList.map((v:any, i:number) => {
            // v.subMenu = []
            v.open = true // 增加一个控制展开关闭字段
            // v.btnCheckbox = false // 设置一个全选btn flag
          })
          this.spinning = false
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
      })
    }
    allChangeMenu (e:any):void { // 全选菜单权限
      if (e.target.checked) {
        this.menuList.map((v:any, i:number) => {
          v.isCheck = true
          if (v.subMenu.length) {
            v.subMenu.map((val:any, ind:number) => {
              val.isCheck = true
            })
          }
        })
      } else {
        this.menuList.map((v:any, i:number) => {
          v.isCheck = false
          if (v.subMenu.length) {
            v.subMenu.map((val:any, ind:number) => {
              val.isCheck = false
            })
          }
        })
      }
      
    }
    allChangeBtn (e:any):void { // 全选按钮权限
      if (e.target.checked) {
        this.menuList.map((v:any, i:number) => {
          v.btnCheckbox = true
          if (v.btns.length) {
            v.btns.map((val:any, ind:number) => {
              val.isCheck = true
            })
          }
          if (v.subMenu.length) {
            v.subMenu.map((val:any, ind:number) => {
              val.btnCheckbox = true
              if (val.btns.length) { // 子菜单按钮
                val.btns.map((value:any, index:number) => {
                  value.isCheck = true
                })
              }
            })
          }
        })
      } else {
        this.menuList.map((v:any, i:number) => {
          v.btnCheckbox = false
          if (v.btns.length) {
            v.btns.map((val:any, ind:number) => {
              val.isCheck = false
            })
          }
          if (v.subMenu.length) {
            v.subMenu.map((val:any, ind:number) => {
              val.btnCheckbox = false
              if (val.btns.length) { // 子菜单按钮
                val.btns.map((value:any, index:number) => {
                  value.isCheck = false
                })
              }
            })
          }
        })
      }
    }
    allOpen ():void { // 全部展开
      if (this.openText === '全部收缩') {
        this.menuList.map((v:any, i:number) => {
          v.open = false
        })
        this.openText = '全部展开'
      } else {
        this.menuList.map((v:any, i:number) => {
          v.open = true
        })
        this.openText = '全部收缩'
      }
    }
    toggleIcon (index:number):void { // 点击icon按钮
      let a = this.menuList[index]
      a.open = !a.open
      this.menuList.splice(index, 1, a) // 因vue对数组对象字段的修改会造成dom不更新问题
      // this.menuList[index].open = !this.menuList[index].open
      console.log(this.menuList[index])
    }
    btnListAllCheck (e:any, item:any):void { // 一个菜单项下 按钮全选事件
      if (e.target.checked) {
        item.btnCheckbox = true
        if (item.btns.length) { // 操作平级按钮
          item.btns.map((v:any, i:number) => {
            v.isCheck = true
          })
        }
        if (item.subMenu.length) { // 操作其子节点按钮
          item.subMenu.map((v:any, index:number) => {
            v.btnCheckbox = true
            if (v.btns.length) {
              v.btns.map((val:any, ind:number) => {
                val.isCheck = true
              })
            }
          })
        }
      } else {
        item.btnCheckbox = false
        if (item.btns.length) {
          item.btns.map((v:any, i:number) => {
            v.isCheck = false
          })
        }
        if (item.subMenu.length) {
          item.subMenu.map((v:any, index:number) => {
            v.btnCheckbox = false
            if (v.btns.length) {
              v.btns.map((val:any, ind:number) => {
                val.isCheck = false
              })
            }
          })
        }
      }
    }
    parentMenuBtnChange (e:any, btn:any):void { // 主菜单上按钮选择事件
      if (e.target.checked) {
        btn.isCheck = true
      } else {
        btn.isCheck = false
      }
    }
    allListBtns (e:any, list:any):void { // 子菜单全选按钮事件
      if (e.target.checked) {
        list.btnCheckbox = true
        if (list.btns.length) {
          list.btns.map((v:any, index:number) => {
            v.isCheck = true
          })
        }
      } else {
        list.btnCheckbox = false
        if (list.btns.length) {
          list.btns.map((v:any, index:number) => {
            v.isCheck = false
          })
        }
      }
    }
    itemMenuCheckboxChange (e:any, item:any) { // 单个菜单项选择
      if (e.target.checked) {
        item.isCheck = true
        if (item.subMenu.length) {
          item.subMenu.map((v:any, index:number) => {
            v.isCheck = true
          })
        }
      } else {
        item.isCheck = false
        if (item.subMenu.length) {
          item.subMenu.map((v:any, index:number) => {
            v.isCheck = false
          })
        }
      }
    }
    itemBtnCheckboxChange (e:any, item:any) { // 单个按钮项选择
      if (e.target.checked) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
    }
    childMenuCheckboxChange (e:any, list:any, item:any) { // 子级菜单change事件
      if (e.target.checked) {
        list.isCheck = true
        item.isCheck = true // 将父级选中
      } else {
        list.isCheck = false
      }
    }
    handleSubmit ():void { // 提交方法
      this.allCheckbox = [];
      (this as any).form.validateFields((err: any, values: any) => {
        if (!err) {
          this.menuList.map((v:any, index:number) => {
            if (v.isCheck) {
              this.allCheckbox.push(v.pid)
            }
            if (v.btns.length) { // 获取菜单平级下选中按钮
              v.btns.map((val:any, ind:number) => {
                if (val.isCheck) {
                  this.allCheckbox.push(val.pid)
                }
              })
            }
            if (v.subMenu.length) { // 获取子节点下选中按钮
              v.subMenu.map((val:any, ind:number) => {
                if (val.isCheck) {
                  this.allCheckbox.push(val.pid)
                }
                if (val.btns.length) {
                  val.btns.map((value:any, index:number) => {
                    if (value.isCheck) {
                      this.allCheckbox.push(value.pid)
                    }
                  })
                }
              })
            }
          })
          let url:string = '/custom/RoleManage/updateRoleInfo'
          let params:any = Object.assign({
            type: this.type,
            roleId: this.roleId,
            priList: this.allCheckbox.join(',')
          }, values)
          this.submitFun(url, params) // ajax
        } else {
          (this as any).$message.error('请输入角色名称', 3)
        }
      })
    }
    submitFun (url:string, params:any):void {
      (this as any).$post(url, params).then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
          (this as any).$message.success(res.message, 3);
          setTimeout(() => {
            (this as any).$router.push({ path: '/roleManagement' }) 
            // window.location.href = window.location.origin + '/roleManagement' // 
          }, 1000)
        } else {
          (this as any).$message.error(res.message, 3); // 弹出错误message
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

<style lang='less' scoped>
.rolemanageList{
  margin:10px;
  .lpc_role_header {
    .ant-card {
      border-radius: 6px;
      margin-bottom: 20px;
      .ant-card-head {
        background-color: #dad6d6;
        border: 1px solid #cfcece;
      }
    }
  }
  .rolemanageSet{
    border-radius: 0 0 6px 6px;
    background-color: #fafafa;
    overflow-x: scroll; 
    .lpc-table-fixed {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      border-radius: 4px 4px 0 0;
      display: table;
      border-spacing: 2px;
      .lpc-table-thead {
        th {
          padding: 16px 16px;
          word-break: break-word;
          background: #fafafa;
          transition: all .3s ease;
          text-align: left;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
          border-bottom: 1px solid #e8e8e8;
          border: 1px solid #e8e8e8;
        }
      }
      .lpc-table-tbody {
        :first-child {
          td span {
            float: right;
            cursor: pointer;
          }
        }
        tr > td {
          border: 1px solid #e8e8e8;
          padding: 16px 16px;
          span {
            float: right;
            cursor: pointer;
          }
        }
        tr.lpc-parentTr {
          background: #f2f2f2;
        }
        tr.lpc-children-tr > td{
          padding-left: 40px;
        }
      }
    }
  }
}
</style>
