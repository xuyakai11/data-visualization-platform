<template>
  <div class="leftMenu">
    <div :class="ziduan ? 'hide-set' : 'lpc-show-set'" @click="openSet"><a-icon type="right"/><p>字段配置</p></div>
    <div :class="ziduan ? 'lpc-full' : 'lpc-full-hide'">
      <div class="header">
        <a-input-search placeholder="搜索表字段" @change="onChange" />
        <a-icon type="close" @click="closeSet"/>
      </div>
      <a-tree
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :treeData="dataSourceTree"
          @select="getInfo"
        ><!-- @select="selectTreeFun($event)" -->
        <!-- <a-tree-node v-for="(item, index) in dataSourceTree" :title="item.title" :key="item.id">
          <a-tree-node v-for="(list, i) in item.children" :title="list.title" :key="list.id" @dblclick="getInfo(list.id)"/>
        </a-tree-node> -->
        <template slot="title" slot-scope="{title}">
          <span v-if="title.indexOf(searchValue) > -1">
            {{title.substr(0, title.indexOf(searchValue))}}
            <span style="color: #f50">{{searchValue}}</span>
            {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
          </span>
          <span v-else>{{title}}</span>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

  @Component
  export default class step2LeftMenu extends Vue {
    @Prop({}) dataSourceTree!:any // 从父组件接收树数据  这里的感叹号是对属性的非空断言；（null和undefined）的判断

    expandedKeys:Array<any> = []
    searchValue:string = ''
    SelectedKeys:Array<any> = []
    autoExpandParent:boolean = true
    dataSource:Array<object> = [
      {
        title: '话题',
        key: '122',
        scopedSlots: {title: 'title'},
        selectable: false, // 配置节点是否可选
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
        selectable: false, // 配置节点是否可选
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
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign 是一个设计语言',
          scopedSlots: {title: 'title'},
          key: '100000',
        }]
    }];
    dataList:Array<object> = [] // 存放处理后的tree数据
    ziduan:boolean = true // 配置 字段配置是否显示

    @Emit('treeDblData') treeDblDataFun (e: number) {};

    // deep: 深度监听， immediate代表声明监听后立即执行方法
    // 监听dataSourceTree 是因为父组件传过来的时候有可能为空
    @Watch('dataSourceTree', { deep: true, immediate: true }) onAtagDatasHChangeFun (newVal:string, oldVal:string) { 
      if (newVal) {
        this.generateList(this.dataSourceTree)
      }
    }
    /* mounted () { 
      console.log(this.dataList)
    } */
    generateList (data:any):void { // 将数据处理成只有一个层级
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        // data[i].node = { id: node.id }
        this.dataList.push(node)
        // this.dataList.push({ id: node.id, title: node.title, key: node.key, scopedSlots: { title: 'title', nodes: node.id } })
        if (node.children) {
          (this as any).generateList(node.children)
        }
      }
    }
    getParentKey (key:string, tree:any):void {
      let parentKey:any = '';
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some((item:any) => item.key === key)) {
            parentKey = node.key
          } else if ((this as any).getParentKey(key, node.children)) {
            parentKey = (this as any).getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    }
    onExpand (expandedKeys:any):void {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    }
    onChange (e:any):void {
      const value:any = e.target.value
      const expandedKeys = this.dataList.map((item:any) => { // 遍历 查询所有的节点
        if (item.title.indexOf(value) > -1) {
          return (this as any).getParentKey(item.key, this.dataSourceTree)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i); // 过滤出要打开的节点
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    }
    openSet ():void { // 点击配置栏
      this.ziduan = !this.ziduan
    }
    closeSet ():void { // 点击关闭按钮
      this.ziduan = !this.ziduan
    }
    selectTreeFun (e:any, node:any):void { // 点击选中事件
      console.log(e, node)
      // let obj:object = { text: e } // 将双击选中的传递给父组件
      // this.treeDblDataFun(obj)
    }
    getInfo (e:any, node:any) { // 树控件单击事件
      if (e.length) {
        let fieldId:number = node.id
        this.treeDblDataFun(+e.toString())
      }
    }
    filterOption (input:any, option:any):any { // 搜索框输入搜索 过滤方法
      console.log(option)
      console.log(this.dataSourceTree)
      console.log(option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0)
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .leftMenu {
    border-right: 1px solid #e8e8e8;
    .lpc-show-set {
      background-color: #f9f9fa;
      height: 100%;
      width: 25px;
      padding: 5px;
      transition: all .5s;
      overflow: hidden;
      cursor: pointer;
      p {
        word-wrap: break-word;
        letter-spacing: 15px;
      }
    }
    .hide-set {
      position: relative;
      top: 0;
      left: -25px;
      height: 0;
      width: 0;
      overflow: hidden;
    }
    .lpc-full {
      width: 250px;
      height: 100%;
      transition: all .5s;
      .header {
        background-color: #f9f7f7;
        padding: 5px 10px;
        border-bottom: 1px solid #e8e8e8;
        height: 43px;
        overflow: hidden;
        .ant-input-affix-wrapper {
          width: 90%;
        }
        .anticon {
          margin-left: 8px;
          cursor: pointer;
        }
      }
      ul.ant-tree {
        height: calc(64vh - 43px);
        overflow-y: scroll;
      }
    }
    .lpc-full-hide {
      position: relative;
      top: 0;
      left: -250px;
      width: 0;
      height: 0;
      transition: all .5s;
      .header {
        background-color: #f9f7f7;
        padding: 5px 10px;
        border-bottom: 1px solid #e8e8e8;
        .ant-input-affix-wrapper {
          width: 90%;
        }
        .anticon {
          margin-left: 8px;
          cursor: pointer;
        }
      }
      ul.ant-tree {
        height: calc(64vh - 43px);
        overflow-y: scroll;
      }
    }
  }
</style>
