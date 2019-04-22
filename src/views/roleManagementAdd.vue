<template>
  <div>
    <a-card title="编辑角色" :bordered="false"></a-card>
    <div class="rolemanageList">
      <div class="rolemanageSet">
        <template v-for="(item,key) in lists">
          <a-collapse :key="key" v-model="activeKey">
            <a-collapse-panel :key="key">
              <template slot="header">
                  {{item.name}}
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
        </template>    
      </div>    
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component
  export default class roleManagementAdd extends Vue {
    data: Array<object> = []
    lists: any = {}
    activeKey: string[] = []
    getarr: Array<string> = ["1"]
    // @Watch('activeKey', { immediate: true, deep: true })
	// watchactiveKey (): string[] {
    //     console.log(this.lists);
	// 	return ['02']
	// }
    created () {
      this.lists = {
        '01': {
            mind: '01',
            name: '市场营销',
            ischeck: false,
            subMenu: {
              '011': {
                mid: '011',
                name: '客户分配池',
                ischeck: true,
                btns: [
                  {
                    pid: '0111',
                    pname: '添加按钮',
                    ischeck: false
                  },
                  {
                    pid: '0112',
                    pname: '修改按钮',
                    ischeck: true
                  },
                  {
                    pid: '0113',
                    pname: '删除按钮',
                    ischeck: true
                  }
                ]
              },
              '012': {
                mid: '012',
                name: '客户管理',
                ischeck: false,
                btns: []
              },
              '013': {
                mid: '013',
                name: '全部客户管理',
                ischeck: false,
                btns: []
              },
              '014': {
                mid: '014',
                name: '部分客户管理',
                ischeck: false,
                btns: []
              }
            }
        },
        '02': {
            mind: '02',
            name: '基础信息设置',
            ischeck: 1,
            subMenu: {
              '021': {
                mid: '011',
                name: '留学产品设置',
                ischeck: 0,
                btns: [
                  {
                    pid: '0211',
                    pname: '添加按钮',
                    ischeck: true
                  },
                  {
                    pid: '0212',
                    pname: '修改按钮',
                    ischeck: true
                  },
                  {
                    pid: '0213',
                    pname: '删除按钮',
                    ischeck: true
                  }
                ]
              },
              '022': {
                mid: '022',
                name: '账号管理',
                ischeck: true,
                btns: []
              },
              '023': {
                mid: '023',
                name: '阶梯定价管理',
                ischeck: false,
                btns: []
              },
              '024': {
                mid: '024',
                name: '岗位管理',
                ischeck: false,
                btns: []
              }
            }
        }
      }
      for (let key in this.lists) {
         this.activeKey.push(key); 
      }  
    }
    // 点击二级菜单
    onChange (e:any, submenu:any, firstmenu:any):void {
      // 此处item=>每个二级菜单对象；firstmenu=>每个一级菜单对象；
      submenu.ischeck = e.target.checked;
      let l: number = 0;
      for (let key in firstmenu.subMenu) {
        if (firstmenu.subMenu[key].ischeck) {
          l += 1;
        }
      }
      if (l === Object.keys(firstmenu.subMenu).length) {
        firstmenu.ischeck = true;
      } else {
        firstmenu.ischeck = false;
      }
    }
    checkAll (e:any, item:any):void {
      item.ischeck = e.target.checked;
      for (let key in item.subMenu) {
        item.subMenu[key].ischeck = e.target.checked;
      }
    }
    returnBtnCheck (btns:any):boolean {
      let percheckedbtnnum: number = 0;
      btns.forEach((item:any, index:number, arr:Array<object>) => {
        if (item.ischeck) {
          percheckedbtnnum += 1;
        }
      })
      if (percheckedbtnnum === btns.length) {
        return true;
      } else {
        return false;
      }
    }
    checkbtnAll (e:any, btns:any):void {
      let btncheck = e.target.checked;
      btns.forEach((item:any, index:number, arr:Array<object>) => {
        if (btncheck) {
          item.ischeck = true;
        } else {
          item.ischeck = false;
        }
      })
    }
    perbtnChange (e:any, item:any):void {
      item.ischeck = e.target.checked;
    }
    checkbtnWhole (e:any, item:any):void {
        for (let index in item.subMenu) {
          item.subMenu[index].btns.forEach((per:any, j:number, arr:Array<object>) => {
            per.ischeck = e.target.checked;
          })
        }
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
}
</style>
