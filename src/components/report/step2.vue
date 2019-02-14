<template>
  <div>
    <div class="lpc-step2-content">
      <left-menu></left-menu>
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
                    placeholder="添加组行"
                    optionFilterProp="children"
                    style="width: 200px"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                    :filterOption="filterOption">
                    <a-select-opt-group>
                      <span slot="label"><a-icon type="user"/>Manager</span>
                      <a-select-option value="jack1">Jack1</a-select-option>
                      <a-select-option value="lucy1">Lucy1</a-select-option>
                    </a-select-opt-group>
                    <a-select-opt-group label="Engineer">
                      <a-select-option value="Yiminghe1">yiminghe1</a-select-option>
                    </a-select-opt-group>
                  </a-select>
                  <div class="task-content">
                    <draggable :options="dragOptions" :onEnd="onEnd()" :onUpdate="onUpdate()" v-model="aTagDatasH">
                      <p class="task-item" type="inner" v-for="(item, i) in aTagDatasH">
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
                  <div class="tab1-top-content-bottom">
                    <h4>组列</h4>
                    <a-select
                      showSearch
                      placeholder="添加组列"
                      optionFilterProp="children"
                      style="width: 200px"
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
                      <draggable :options="dragOptions" :onEnd="onEnd()" :onUpdate="onUpdate()" v-model="aTagDatasL">
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
                  </div>
                </div>
              </div>
              <div class="tab1-bottom">
                <h4>列数</h4>
                <a-select
                  showSearch
                  placeholder="添加组列"
                  optionFilterProp="children"
                  style="width: 200px"
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
                  <draggable :options="dragOptions" :onEnd="onEnd()" :onUpdate="onUpdate()" v-model="aTagDatasS">
                    <p class="task-item" type="inner" v-for="(item, i) in aTagDatasS">
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
            222content
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>

    <a-form>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
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
    aTagDatasH:Array<any> = [{text: '111'},{text: '222'},{text: '333'}]
    aTagDatasL:Array<any> = [{text: '444'},{text: '555'},{text: '666'},{text: '777'},{text: '888'},{text: '999'}]
    aTagDatasS:Array<any> = [{text: '111'},{text: '222'},{text: '333'}]
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

    nextStep ():void {
      let _this = this
      _this.loading = true
      setTimeout(() => {
        _this.$emit('nextStep')
      }, 1000)
    }
    prevStep ():void {
      this.$emit('prevStep')
    }
    deleteAllGroup ():void { // 删除所有组

    }

    handleChange (value:any):void { // 报表设置栏 组行 组列 搜索下拉框方法
      console.log(`selected ${value}`);
    }
    filterOption (input:any, option:any):boolean {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    handleBlur ():void {
      // console.log('blur');
    }
    handleFocus ():void {
      // console.log('focus');
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
    deleteGroup ():void {

    }


 }
</script>

<style lang='scss' rel='stylesheet/scss'>
.lpc-step2-content {
  display: flex;
  border: 1px solid #e8e8e8;
  .lpc-centerTab {
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
            font-size: .75rem;
            margin-right: 10px;
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
        h4 {
          color: #6b6d70;
          font-weight: 700;
          font-size: .8125rem;
          text-transform: uppercase;
          display: -ms-flexbox;
          display: box;
          display: -webkit-box;
          display: flex;
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
      }
      .task-content{ // 公用拖拽模块样式
        .task-item {
          font-variant: tabular-nums;
          width: 200px;
          color: rgba(0, 0, 0, 0.65);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 5px 0;
          padding: 0;
          list-style: none;
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
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
