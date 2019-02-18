<template>
  <div>
    <div class="lpc-step2-content">
      <!-- leftTree -->
      <left-menu></left-menu>
      <!-- middletab -->
      <div class="lpc-centerTab">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="apple"/>报表设置</span>
            <div class="lpc-tab1-content">
              <div class="tab1-top">
                <div class="tab1-top-header">
                  <h4>分组</h4>
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>删除所有分组</span>
                    </template>
                    <a-icon type="delete" @click="deleteAllGroup"/>
                  </a-tooltip>
                </div>
                <div class="tab1-top-content">
                  <h4>组行</h4>
                  <a-select
                    showSearch
                    allowClear
                    placeholder="添加组行"
                    ref="handleChangeH"
                    style="width: 100%"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChangeH"
                    :filterOption="filterOption">
                    <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                      <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                      <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                    </a-select-opt-group>
                   <!--  <a-select-opt-group label="Engineer">
                      <a-select-option value="Yiminghe1">yiminghe1</a-select-option>
                    </a-select-opt-group> -->
                  </a-select>
                  <div class="task-content">
                    <draggable :options="dragOptions" v-model="aTagDatasH" :move="onEnd">
                      <p class="task-item" type="inner" v-for="(item, i) in aTagDatasH" :key="i">
                        {{item.text}}
                        <a-tooltip placement="right">
                          <template slot="title">
                            <span>删除</span>
                          </template>
                          <a-icon type="close" @click="deleteGroup"/>
                        </a-tooltip>
                      </p>
                    </draggable>
                  </div>
                  <!-- <div class="tab1-top-content-bottom">
                    <h4>组列</h4>
                    <a-select
                      showSearch
                      placeholder="添加组列"
                      optionFilterProp="children"
                      style="width: 100%"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @change="handleChange"
                      :filterOption="filterOption">
                      <a-select-opt-group>
                        <span slot="label"><a-icon type="user"/>Manager</span>
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                      </a-select-opt-group>
                      <a-select-opt-group label="Engineer">
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                      </a-select-opt-group>
                    </a-select>
                    <div class="task-content">
                      <draggable :options="dragOptions" :End="onEnd()" :Update="onUpdate()" v-model="aTagDatasL">
                        <p class="task-item" type="inner" v-for="(item, i) in aTagDatasL">
                          {{item.text}}
                          <a-tooltip placement="right">
                            <template slot="title">
                              <span>删除</span>
                            </template>
                            <a-icon type="close" @click="deleteGroup"/>
                          </a-tooltip>
                        </p>
                      </draggable>
                    </div>
                  </div> -->
                </div>
              </div>
              <a-divider />
              <div class="tab1-bottom">
                <div class="tab1-bottom-header">
                  <h4>列数</h4>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" href="#">
                      <a-icon type="down-square" />
                    </a>
                    <a-menu slot="overlay">
                      <!-- <a-menu-item key="0">
                        <a href="javascript:void(0)">添加存储器列</a>
                      </a-menu-item> -->
                      <a-menu-item key="1" :disabled="!aTagDatasH.length"> <!-- 当组行为空时不能选 -->
                        <a href="javascript:void(0)" >添加汇总公式</a>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="3">删除所有列</a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </div>
                <a-select
                  showSearch
                  allowClear
                  placeholder="添加组列"
                  optionFilterProp="children"
                  style="width: 100%"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChangeS"
                  :filterOption="filterOption">
                  <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                    <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                    <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                  </a-select-opt-group>
                </a-select>
                <div class="task-content">
                  <draggable :options="dragOptions" v-model="aTagDatasS" :move="onEnd">
                    <p class="task-item" type="inner" v-for="(item, i) in aTagDatasS" :key="i">
                      {{item.text}}
                      <a-tooltip placement="right">
                        <template slot="title">
                          <span>删除</span>
                        </template>
                        <a-icon type="close" @click="deleteGroup"/>
                      </a-tooltip>
                    </p>
                  </draggable>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="android"/>筛选</span>
            <div class="lpc-tab2-content">
              <div class="tab2-top-header">
                <h4>固定筛选器</h4>
                <!-- <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" href="#">
                    <a-icon type="down-square" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <a href="javascript:void(0)">添加筛选逻辑</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:void(0)">添加交叉筛选器</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown> -->
              </div>
              <a-select
                showSearch
                allowClear
                placeholder="添加固有筛选"
                optionFilterProp="children"
                style="width: 100%"
                @focus="handleFocus"
                @blur="handleBlurF"
                @change="handleChangeF"
                :filterOption="filterOption">
                <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                  <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                  <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                </a-select-opt-group>
              </a-select>
              <div class="screening-content">
                <a-popover arrowPointAtCenter placement="right" title="编辑筛选器" trigger="click" :visible="item.visible" @click="popoverVisibleFun($event, item)" v-model="item.popover" v-for="(item, i) in aTagDatasF" :key="i">
                  <div slot="content">
                    <div v-if="item.type == 'time'">这是时间类型</div>
                    <div v-if="item.type == 'number'">这是数字</div>
                    <div v-if="item.type == 'string'">这是字符串类型</div>
                    <div v-if="item.type == 'select'">这是复选框</div>
                    <div v-if="item.type == 'list'">这是列表类型</div>
                    <div class="content-footer">
                      <a-button size="small" @click="hidePopover(item)">取消</a-button>
                      <a-button size="small" type="primary" @click="hidePopover(item)">应用</a-button>
                    </div>
                  </div>
                  <div class="screening-item">
                    <div class="lpc-fixed-text">
                      <p class="title">{{item.title}}</p>
                      <p class="text">{{item.text}}</p>
                    </div>
                    <a-tooltip placement="right" v-if="!item.type"> <!-- 判断固定项不显示删除按钮 -->
                      <template slot="title">
                        <span>删除</span>
                      </template>
                      <a-icon type="close" @click="deleteFixed"/>
                    </a-tooltip>
                  </div>
                </a-popover>
              </div>
              <a-divider />
              <div class="tab2-top-header">
                <h4>显示筛选器</h4>
              </div>
              <a-select
                showSearch
                allowClear
                placeholder="添加显示筛选"
                optionFilterProp="children"
                style="width: 100%"
                @focus="handleFocus"
                @blur="handleBlurX"
                @change="handleChangeX"
                :filterOption="filterOption">
                <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                  <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                  <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                </a-select-opt-group>
              </a-select>
              <div class="According-content">
                <a-popover arrowPointAtCenter placement="right" id="ant-popover" title="编辑筛选器" trigger="click" :visible="item.visible" @click="popoverVisibleFun($event, item)" v-model="item.popover" v-for="(item, i) in aTagDatasX" :key="i">
                  <div slot="content">
                    <div v-if="item.type == 'time'">这是时间类型</div>
                    <div v-if="item.type == 'number'">这是数字</div>
                    <div v-if="item.type == 'string'">这是字符串类型</div>
                    <div v-if="item.type == 'select'">这是复选框</div>
                    <div v-if="item.type == 'list'">这是列表类型</div>
                    <div class="content-footer">
                      <a-button size="small" @click="hidePopover(item)">取消</a-button>
                      <a-button size="small" type="primary" @click="hidePopover(item)">应用</a-button>
                    </div>
                  </div>
                  <div class="According-item">
                    <div class="lpc-fixed-text">
                      <p class="title">{{item.title}}</p>
                      <p class="text">{{item.text}}</p>
                    </div>
                    <a-tooltip placement="right" v-if="!item.type"> <!-- 判断固定项不显示删除按钮 -->
                      <template slot="title">
                        <span>删除</span>
                      </template>
                      <a-icon type="close" @click="deleteFixed"/>
                    </a-tooltip>
                  </div>
                </a-popover>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- rightTable -->
      <div class="lpc-rightTable">
        <div class="table-header">
          <div class="table-header-left">
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
          <div class="table-header-right">
            <a-button type="primary" :loading="saveLoading" @click="saveFun">保存</a-button>
            <a-button type="primary" class="runBtn" :loading="runLoading" @click="runFun">运行</a-button>
          </div>
        </div>
        <div class="table-content">
          <div class="ant-table-body">
            <table>
              <thead>
                <tr>
                  <th v-for="(item, index) in columns" :key="index" :style="{width: item.title.length * 18 + 'px'}">{{item.title}}</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <a-form>
      <a-form-item>
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import leftMenu from '@/components/report/step2LeftMenu.vue'
  // import middenTab from '@/components/report/step2MiddenTab.vue'
  import Draggable from 'vuedraggable'
  /* import leftMenu2 from '@/components/report/leftMenu.vue' */
 @Component({
   components: { leftMenu, Draggable }
 })
 export default class sterp2 extends Vue {
    @Prop() reportId: any // 从父组件接收reportId
    loading: boolean = false
    dataSource:Array<object> = [{
      title: '话题',
      key: '122',
      scopedSlots: {title: 'title'},
      children: [{
        title: 'AntDesign',
        scopedSlots: {title: 'title'},
        key: '10000',
      }, {
        title: 'AntDesign UI',
        scopedSlots: {title: 'title'},
        key: '10600',
      }]
    }, {
      title: '问题',
      scopedSlots: {title: 'title'},
      key: '1',
      children: [{
        title: 'AntDesign UI 有多好',
        scopedSlots: {title: 'title'},
        key: '60100'
      }, {
        title: 'AntDesign 是啥',
        scopedSlots: {title: 'title'},
        key: '30010'
      }]
    }, {
      title: '文章',
      scopedSlots: {title: 'title'},
      key: '123',
      children: [{
        title: 'AntDesign 是一个设计语言',
        scopedSlots: {title: 'title'},
        key: '100000',
      }]
    }]
    aTagDatasH:Array<any> = [] // 组行
    aTagDatasL:Array<any> = []
    aTagDatasS:Array<any> = [] // 列数
    // 状态type time时间，number数字，string字符串，list列表， select复选框
    aTagDatasF:Array<any> = [{title: '订单日期', text: '111', type: 'time', popover: false, visible: false}, {title: '数字类型', text: '222', type: 'number', popover: false, visible: false }] // 固定筛选
    aTagDatasX:Array<any> = [{title: '字符串', text: '333', popover: false, type: 'string', visible: false}, {title: '复选框类型', text: '333', popover: false, type: 'select', visible: false }, {title: '订单列表', text: '333', popover: false, type: 'list', visible: false }] // 显示筛选
    @Watch('aTagDatasH')
    private aTagDatasChange (val:any, oldVal:any) {
     console.log(val)
     console.log(oldVal)
    }
    dragOptions: object = { // 拖拽组件相关配置
      sort: true, // 定义是否拖拽
      group: 'task', // string or array分组用的，同一组的不同的list可以相互拖拽
      scroll: true, // 拖放可以引起区域滚动
      scrollSpeed: 2, // 滚动速度
      animation: 150, // 动画时间
      ghostClass: 'dragable-ghost', // 拖拽是产生的副本影子单元样式，用来模拟被拖拽元素的排序情况
      chosenClass: 'dragable-chose', // 选中拖拽目标时样式
      dragClass: 'dragable-drag' // 拖拽中样式
    }
    titleName:string = '报表名称'
    titleNameEdit:boolean = false // 配置报表名称修改
    cancelTitleNameFlag:string = '' // 用于取消还原修改
    saveLoading:boolean = false
    runLoading:boolean = false
    columns:Array<object> = [{
        title: '移动后的序号',
        dataIndex: 'name'
      }, {
        title: 'Ag移动后的序号e',
        dataIndex: 'age'
      }, {
        title: '移动后的序号',
        dataIndex: 'address',
      }]
    data:Array<object> = []
    mounted () {
      
    }

    nextStep ():void {
      let _this = this
      _this.loading = true
      setTimeout(() => {
        _this.loading = false
        _this.$emit('nextStep')
      }, 1000)
    }
    prevStep ():void {
      this.$emit('prevStep')
    }
    deleteAllGroup ():void { // 删除所有组
      this.aTagDatasH = []; // 清空组行
      // console.log((this as any).$refs.handleChangeH)
    }
    handleChangeH (value:any):void { // 报表设置栏 组行 搜索框下拉选择方法
      if (value) {
        this.aTagDatasH.push({ text: value })
      }
    }
    handleChangeS (value:any):void { // 报表设置栏 列数
      if (value) {
       this.aTagDatasS.push({ text: value }) 
      }
    }
    handleChangeF (value:any):void { // 固定筛选
      if (value) {
        console.log(value)
       this.aTagDatasF.push({ title: value, text: '111', type: 'string', popover: true, visible: true }) 
      }
    }
    handleChangeX (value:any):void { // 显示筛选
      if (value) {
       this.aTagDatasX.push({ title: value, text: '111', type: 'time', popover: true, visible: true }) 
      }
    }
    filterOption (input:any, option:any):boolean {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    handleBlur ():void {
    }
    handleFocus ():void {
    }
    handleBlurF ():void { // 固定筛选器失去焦点
      // this.aTagDatasF.pop()
    }
    handleBlurX ():void { // 显示筛选器失去焦点
      // this.aTagDatasX.pop()
    }
    // to:移动到的列表的容器, from:来源列表容器, item:被移动的单元, clone:副本的单元, oldIndex:移动前的序号, newIndex:移动后的序号
    onEnd (to:any, from:any, item:any, clone:any, oldIndex:any, newIndex:any):void { // 拖拽移动结束
      console.log('移动到的列表的容器' + to)
      console.log('来源列表容器' + from)
      console.log('被移动的单元' + item)
      console.log('副本的单元' + clone)
      console.log('移动前的序号' + oldIndex)
      console.log('移动后的序号' + newIndex)
    }
    onUpdate (to:any, from:any, item:any, clone:any, oldIndex:any, newIndex:any):void { // 拖拽移动排序发生变化时

    }
    deleteGroup ():void { // 删除组行，列数方法

    }
    deleteFixed ():void { // 删除固定筛选项方法

    }
    clickAccording (e:any):void { // 点击筛选器
      const value = e.target
      console.log(value)
    }

    popoverVisibleFun (e:any, item:any) { // 筛选器点击 是否显示气泡框事件
      console.log(item.type)
      console.log(e)
    }

    handleClickChange (v:any):void {
      console.log(v)
    }
    hidePopover (e:any):void { // 取消关闭气泡框
      console.log(e)
      e.popover = false
    }
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
    saveFun ():void { // 保存方法
      this.saveLoading = true
      let _this = this
      setTimeout(() => {
        _this.saveLoading = false
      }, 2000)
    }
    runFun ():void { // 运行方法
      this.runLoading = true
      let _this = this
      setTimeout(() => {
        _this.runLoading = false
      }, 2000)
    }
 }
</script>

<style lang='scss' rel='stylesheet/scss'>
.lpc-step2-content {
  display: flex;
  border: 1px solid #e8e8e8;
  .lpc-centerTab {
    width: 233px;
    border-right: 1px solid #e8e8e8;
    .ant-tabs .ant-tabs-bar {
      margin: 0;
    }
    .ant-tabs-nav-wrap {
      background-color: #f9f7f7;
      border-bottom: 1px solid #e8e8e8;
      height: 43px;
      line-height: 43px;
      margin-bottom: 0;
      .ant-tabs-tab {
        margin: 0;
        padding: 0 26px;
      }
    }
    .lpc-tab1-content {
      padding: .875rem 1rem;
      height: calc(80vh - 43px);
      overflow-y: scroll;
      .tab1-top {
        .tab1-top-header {
          margin-bottom: .5rem;
          line-height: 19px;
          display: flex;
          h4 {
            flex: 1;
            display: inline-block;
            color: #6b6d70;
            font-weight: 700;
            font-size: .8125rem;
          }
          i.anticon-delete {
            cursor: pointer;
            font-size: 14px;
            // margin-right: 10px;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i.anticon-delete:hover {
            color: #1890ff;
          }
        }
        .tab1-top-content {
          h4 {
            font-size: .6875rem;
            color: #6b6d70;
            text-transform: uppercase;
            display: -ms-flexbox;
            display: box;
            display: flex;
            -o-box-align: center;
            align-items: center;
            margin-bottom: .25rem;
            line-height: 2;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
        }
      }
      .tab1-bottom {
        .tab1-bottom-header {
          margin-bottom: .5rem;
          line-height: 19px;
          display: flex;
          h4 {
            flex: 1;
            color: #6b6d70;
            font-weight: 700;
            font-size: .8125rem;
            text-transform: uppercase;
            -o-box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-bottom: .25rem;
            line-height: 2;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a.ant-dropdown-trigger {
            cursor: pointer;
            // margin-right: 10px;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            :hover {
              color: #1890ff;
            }
            .anticon-down-square {
              font-size: 14px;
            }
          }
        }
      }
      .task-content{ // 公用拖拽模块样式
        .task-item {
          font-variant: tabular-nums;
          width: 100%;
          color: rgba(0, 0, 0, 0.65);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 5px 0;
          line-height: 22px;
          height: 22px;
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          background: #fafafa;
          font-size: 12px;
          -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 1;
          white-space: nowrap;
          :hover {
            cursor: move;
          }
          .anticon-close {
            display: inline-block;
            float: right;
            margin-top: 5px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .lpc-tab2-content {
      padding: .875rem 1rem;
      height: calc(80vh - 43px);
      overflow-y: scroll;
      .tab2-top-header {
        margin-bottom: .5rem;
        line-height: 19px;
        display: flex;
        h4 {
          flex: 1;
          color: #6b6d70;
          font-weight: 700;
          font-size: .8125rem;
          text-transform: uppercase;
          -o-box-align: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-bottom: .25rem;
          line-height: 2;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a.ant-dropdown-trigger {
          cursor: pointer;
          font-size: .75rem;
          // margin-right: 10px;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          :hover {
            color: #1890ff;
          }
          .anticon-down-square {
            font-size: 14px;
          }
        }
      }
      .screening-content,.According-content {
        
        .screening-item,.According-item {
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          margin: 3px 0;
          cursor: pointer;
          display: flex;
          .lpc-fixed-text {
            flex: 1;
            display: inline-block;
            .title {
              font-size: .75rem;
              text-overflow: ellipsis;
              overflow-x: hidden;
              color: #6b6d70;
              font-weight: 400;
            }
            .text {
              font-size: .8125rem;
              font-weight: 400;
              color: #16325c;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .anticon-close {
            line-height: 35px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .lpc-rightTable {
    width: 100%;
    overflow-x: scroll;
    .table-header {
      height: 43px;
      line-height: 43px;
      background-color: #f9f7f7;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      .table-header-left {
        display: inline-block;
        flex: 1;
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
      .table-header-right {
        display: inline-block;
        margin-right: 20px;
        .runBtn {
          margin-left: 10px;
          background-color: #1dd9e2c7;
          border: #1dd9e2c7
        }
      }
    }
    .table-content {
      width: 100%;
      overflow-x: scroll;
      table tr th {
        padding: 12px 8px;
        border-right: 1px solid #e8e8e8;
        background: #fafafa;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        border-bottom: 1px solid #e8e8e8;
        white-space: nowrap;
      }
    }
  }
}
.ant-form-item {
  display: block;
  text-align: center;
}
</style>
