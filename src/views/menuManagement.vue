<template>
  <div>
    <a-spin :spinning="spinning" delayTime="500">
      <div class="lpc-leftTree">
        <a-tree
        class="draggable-tree"
        draggable
        @dragenter="onDragEnter"
        @drop="onDrop"
        :treeData="menuData"
        >
          <span slot="title0010" style="color: #1890ff">sss</span>
        </a-tree>
      </div>
    </a-spin>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Draggable from 'vuedraggable'

   /* eslint-disable */
  interface treeObject {
    title: string;
    key: string;
    [propName: string]: any; // 可定义任意属性
  }
  @Component({
    components: { Draggable }
  })
  export default class menuManagement extends Vue {
    
    spinning: boolean = false // 进入页面缓冲动画
    loading: boolean = false

    menuData: Array<object> = [{
      title: 'parent 1',
      key: '0-0',
      children: [{
        title: 'parent 1-0',
        key: '0-0-0',
        // disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      }, {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { key: '0-0-1-0', slots: { title: 'title0010' }},
        ],
      }],
    }]

    created () {
       console.log('请求菜单列表')
      // this.initDataFun()
    }

    initDataFun () { // 初始化请求数据
      (this as any).$post('custom/menuManage/menuList').then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
         
          this.loading = false // 关闭加载动画
        } else {
          this.loading = false;
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
        this.loading = false;
        // this.menuData = {};
      });
    }
    clickFun (index:number) {
      console.log(index)
    }
    onDragEnter (info:any) {

    }
    onDrop (info:any) {
      console.log(info)
      const dropKey = info.node.eventKey
      const dragKey = info.dragNode.eventKey
      const dropPos = info.node.pos.split('-')
      console.log(dropPos)
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      console.log(dropPosition)
      const loop = (data:any, key:string, callback:any) => {
        data.forEach((item:any, index:number, arr:Array<object>) => {
          if (item.key === key) {
            return callback(item, index, arr)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      const data = [...this.menuData]
      // Find dragObject
      let dragObj:any
      loop(data, dragKey, (item:object, index:number, arr:Array<object>) => {
        console.log(arr)
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item:any) => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        (info.node.children || []).length > 0 // Has children
        && info.node.expanded // Is expanded
        && dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item:any) => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else {
        let ar:any;
        let i:any;
        loop(data, dropKey, (item:object, index:number, arr:Array<object>) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }
      this.menuData = data
      console.log(this.menuData)
    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
